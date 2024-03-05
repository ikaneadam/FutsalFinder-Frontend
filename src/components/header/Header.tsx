import React, { ChangeEvent, useState } from 'react';
import { determineDeviceType, useViewport } from '../../helpers/UseViewPort';
import './header.css';

export default function Header() {
    const { width } = useViewport();
    const { isMobile, isTablet, isDesktop } = determineDeviceType(width);

    return <div className="headerContainer">de freaking header komt nog</div>;
}
