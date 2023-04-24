import json
import logging
import time
from flask import Flask, jsonify
from celery import Celery
import numpy as np
import boto3
from botocore.exceptions import ClientError, WaiterError

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)
session = boto3.Session()
sqs = boto3.client('sqs', region_name='us-east-1')
s3 = boto3.client('s3', region_name='us-east-1')
queue_url = 'https://sqs.us-east-1.amazonaws.com/636414103362/imagequeue.fifo'
bucket_name = 'useruploaded'


@celery.task(bind=True)
def generate_output_task(self, object_key, receipt_handle):
    try:
        s3_object = s3.get_object(Bucket=bucket_name, Key=object_key)
        s3_metadata = s3_object['Metadata']

        print(f"S3 metadata for object {object_key}: {s3_metadata}")
        print(f"python jukebox/sample.py --model=5b_lyrics --name=sample_5b --levels=3 --mode=continue \
--audio_file={object_key} --codes_file=sample_5b/level_0/data.pth.tar --sample_length_in_seconds={s3_metadata['outputlength']} --total_sample_length_in_seconds={s3_metadata['samplelength']} \
--sr=44100 --n_samples=6 --hop_fraction=0.5,0.5,0.125")
        sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=receipt_handle)
        return {'status': 'SUCCESS'}

    except ClientError as e:
        print(f"Error getting object from S3: {e}")
        return {'error': f"Error getting object from S3: {e}"}
    except Exception as e:
        print(f"Unknown error occurred: {e}")
        return {'error': f"Unknown error occurred: {e}"} 
        

def process_queue():
    try:
        # Poll for a single message from sqs using queue_url
        message = sqs.receive_message(
            QueueUrl=queue_url, MaxNumberOfMessages=1, WaitTimeSeconds=20)
        # If there are no messages, log the response and return an error response
        if 'Messages' not in message:
            logging.warning(f"No messages found in the queue.")
            return jsonify({'error': 'No messages found in the queue'})
        # Get the message body and pass off to Celery worker 
        message_body = message['Messages'][0]['Body']
        receipt_handle = message['Messages'][0]['ReceiptHandle']
        task_result = generate_output_task(message_body, receipt_handle)
        if 'error' in task_result:
            return jsonify({'error': task_result['error']})
        elif 'status' in task_result:
            return jsonify({'status': task_result['status']})
        else:
            return jsonify({'error': 'Unknown error occurred'})
    except Exception as e:
        logging.error(f"Error processing queue: {e}")
        return jsonify({'error': f"Error processing queue: {e}"})


if __name__ == '__main__':
    with app.app_context():
        while True:
            try:
                process_queue()
                time.sleep(1)
            except Exception as e:
                logging.error(f"Error in main loop: {e}")
                time.sleep(1)


