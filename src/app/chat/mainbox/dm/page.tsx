"use client";

import MessageBox from "./messagebox";
import Profile from "./profile/page";
import { useState } from 'react';

const DMBox = () => {

    const [sidebar, setSidebar] = useState<boolean>(true);

    return (
        <>
            <MessageBox setSidebar={setSidebar} sidebar={sidebar}/>
            
            {
                sidebar && <Profile />
            }
            
        </>
    )   
}

export default DMBox;
