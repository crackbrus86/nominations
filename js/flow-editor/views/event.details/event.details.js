import React from 'react';

import { useFlows } from '../flows.context';

const EventDetails = () => {
    const { currentEvent, onCloseEvent } = useFlows();

    if(!currentEvent)
        return null;

    const onBack = (e) => {
        e.preventDefault();
        onCloseEvent();
    }

    return (<div>
        <h4>Керування потоками</h4>
        <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'><a href='#' onClick={onBack}>Змагання</a></li>
                <li className='breadcrumb-item active' aria-current='page'>Потоки</li>
            </ol>
        </nav>
        <h5>{currentEvent.name}</h5>
    </div>);
}

export default EventDetails;