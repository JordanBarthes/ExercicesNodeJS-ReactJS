import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function(props) {
	if (props.notificationUpload) {
		toast.success('File Upload', {
			position: toast.POSITION.TOP_CENTER
		});
		props.resetNotification();
	} else if (props.notificationError) {
		toast.error('Erreur Upload', {
			position: toast.POSITION.TOP_CENTER
		});
		props.resetNotification();
	}
	return null;
}
