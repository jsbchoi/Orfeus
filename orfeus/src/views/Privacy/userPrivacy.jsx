import privacy_styles from './userPrivacy.module.css';
import { MDBSwitch } from 'mdb-react-ui-kit';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const UserAccount = () => {
  return (
    <div className={privacy_styles.profile_body}>
      <h1 className={privacy_styles.privacy_h1}>Privacy</h1>
      <div className={privacy_styles.privacy_switches}>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked color="secondary" />}
            label="Public Profile"
          />
          <FormControlLabel
            control={<Switch defaultChecked color="secondary" />}
            label="Make All Songs Public"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default UserAccount;
