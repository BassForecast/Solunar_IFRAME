import React from "react";

const ErrorModal = (props) => {
    return( 
        <div style={{display: props.errorModal.isOpen? "block" : "none"}}>
            <div 
                className={`modal fade${props.errorModal.isOpen ? " show" : ""}`} 
                tabIndex="-1" 
                role="dialog" 
                aria-hidden="true" 
                style={{display: props.errorModal.isOpen? "block" : "none"}}
            >
                <div className="modal-dialog modal-dialog-centered  modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header modal__header">
                            <div>{props.errorModal.errorMessage}</div>
                        </div>
                        <div className="modal-body modal__body">
                            <div className={`message ${props.errorModal.errorType}`}>
                                {props.errorModal.error}
                            </div>
                            <div>
                                {props.errorModal.errorType === "Blocker" ? "Please check your internet connection or try again later." : "Please try again later or proceed without BFR."}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="close" aria-label="Close" color="primary" onClick={props.onClick}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal-backdrop fade${props.errorModal.isOpen ? " show" : ""}`}></div>
        </div>
    );
};
export default ErrorModal;
