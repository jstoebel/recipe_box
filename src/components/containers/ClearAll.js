import ClearAllUi from '../ui/ClearAll'
import { connect } from 'react-redux'
import { removeAll } from '../../actions'

const mapDispatchToProps = dispatch => {
	return {
		onRemoveAll() {
			dispatch(
				removeAll()
			)
		}
	}
}

export default connect(null,mapDispatchToProps)(ClearAllUi)
