import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles"

const withSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otheProps }) => {
        return isLoading ?
            (<SpinnerOverlay><SpinnerContainer /></SpinnerOverlay>) :
            (<WrappedComponent {...otheProps} />)
    }
    return Spinner;
}
export default withSpinner;