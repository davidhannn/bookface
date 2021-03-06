import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';

const withSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps}) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    )
    }
    return Spinner;
}

export default withSpinner;