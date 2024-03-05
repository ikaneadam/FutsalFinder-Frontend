import React, { ChangeEvent, useState } from 'react';
import { determineDeviceType, useViewport } from '../helpers/UseViewPort';

export default function Footer() {
    const { width } = useViewport();
    const { isMobile, isTablet, isDesktop } = determineDeviceType(width);

    return (
        <footer
            style={{
                background: '#f2f2f2',
                padding: '50px 0',
                marginTop: '50px',
            }}
        >
            <div style={{ width: isMobile ? '90%' : '70%', margin: '0 auto' }}>
                <h1
                    style={{
                        marginBottom: '10px',
                        textAlign: 'center',
                        fontSize: isMobile ? '1.6em' : '2.5em',
                        color: '#333',
                    }}
                >
                    What is FutsalFinder?
                </h1>
                <p style={{ marginBottom: '25px', fontSize: '1em', color: '#666' }}>
                    FutsalFinder is the ultimate destination for futsal lovers seeking the perfect
                    play space close to home and without breaking the bank.
                </p>

                <p style={{ marginBottom: '25px', fontSize: '1em', color: '#666' }}>
                    Our platform simplifies the quest for quality futsal courts, providing users
                    with a seamless way to locate and book local venues at competitive prices.
                </p>

                <p style={{ marginBottom: '25px', fontSize: '1em', color: '#666' }}>
                    But that's not all – we're also committed to empowering court managers.
                    FutsalFinder offers a robust management suite designed to provide clear insights
                    into court utilization and revenue streams, ensuring that managing your futsal
                    facilities is as enjoyable as the game itself.
                </p>

                <p style={{ marginBottom: '25px', fontSize: '1em', color: '#666' }}>
                    Whether you're looking to play or manage, FutsalFinder is your partner in
                    fostering a vibrant futsal community.
                </p>

                <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                    <h2 style={{ fontSize: '1.5em', textAlign: 'center', color: '#333' }}>
                        They talk about us
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <span style={{ margin: '0 10px', fontSize: '1em', color: '#666' }}>
                            logo1
                        </span>
                        <span style={{ margin: '0 10px', fontSize: '1em', color: '#666' }}>
                            logo2
                        </span>
                        <span style={{ margin: '0 10px', fontSize: '1em', color: '#666' }}>
                            logo3
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <span style={{ margin: '0 10px', fontSize: '1em', color: '#666' }}>
                            logo1
                        </span>
                        <span style={{ margin: '0 10px', fontSize: '1em', color: '#666' }}>
                            logo2
                        </span>
                        <span style={{ margin: '0 10px', fontSize: '1em', color: '#666' }}>
                            logo3
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
