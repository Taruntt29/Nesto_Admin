import React, { useState } from 'react'
import './LoanAgent.css'
import DsaPopUp from './DsaPopUp/DsaPopUp'
import AddDsaFirstStep from './AddDsaFirstStep/AddDsaFirstStep'
import AddDsaSecondStep from './AddDsaSecondStep/AddDsaSecondStep'
import SaveDsaModal from './SaveDsaModal/SaveDsaModal';

const LoanAgent = (props) => {
    const [firstPopUp, setFirstPopUp] = useState(false)
    const [secondPopUp, setSecondPopUp] = useState(false);
    const [addDsaSecondStep, setAddDsaSecondStep] = useState(false);
    const [show, setSaveDsa] = useState(false)

    const onHide = () => {
        setSaveDsa(false)
    }
    return (
        <>
            <div className='loan-agent'>
                <div className='container'>
                    <button className='loan-agent-button' onClick={() => setFirstPopUp(true)}>Dsa</button>
                    <button className='loan-agent-button' onClick={() => setSecondPopUp(true)}>AddDsaFirstStep</button>
                    <button className='loan-agent-button' onClick={() => setAddDsaSecondStep(true)}>AddDsaSecondStep</button>
                    <button className='loan-agent-button' onClick={() => setSaveDsa(true)}>Save Dsa</button>
                </div>
            </div>
            {/* First PopUp */}
            <DsaPopUp
                show={firstPopUp}
                onHide={() => setFirstPopUp(false)}
            />
            {/* Second PopUp */}
            <AddDsaFirstStep
                show={secondPopUp}
                onHide={() => setSecondPopUp(false)}
            />
            {/* Add Dsa Second Step */}
            <AddDsaSecondStep
                show={addDsaSecondStep}
                onHide={() => setAddDsaSecondStep(false)}
            />
            {/* Save Dsa */}
            <SaveDsaModal
                show={show}
                onHide={onHide}
            />


        </>
    )
}

export default LoanAgent