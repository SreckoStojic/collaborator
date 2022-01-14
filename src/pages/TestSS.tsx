import Profile from '@components/Profile';
import Employees from '@components/Employees';
import AddClientModal from '@components/modals/AddNewClient';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { open } from '@reduxStore/actions/modal';
import { RootState } from '@reduxStore/reducers';
//import TutorialsSS from '@pages/TutorialsSS';
import React, { Suspense } from 'react';

const TutorialsSS = React.lazy(() => import('@pages/TutorialsSS'));

function TestSS() {
    const modal = useSelector(
        (state: RootState) => state.modal.type[modalTypes.addNewClient]
    );
    const dispatch = useDispatch();
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ width: '50px', height: '50px' }}>
                <button
                    style={{ width: '50px', height: '50px' }}
                    onClick={() => dispatch(open(modalTypes.addNewClient))}
                >
                    BATN
                </button>
                {modal ? <AddClientModal /> : null}
            </div>
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <TutorialsSS />
                </Suspense>
            </div>
        </div>
    );
}

export default TestSS;
