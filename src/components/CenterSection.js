import React from "react";
import TaskBox from "./TaskBox";

export default function CenterSection() {
    return(
        <section className='center-section'>
            <div className='center-section-box'>
                <TaskBox title='Do zrobienia' count={3}/>
                <TaskBox title='W trakcie' count={2}/>
                <TaskBox title='Zrobione' count={1}/>
            </div>

        </section>
    )
}