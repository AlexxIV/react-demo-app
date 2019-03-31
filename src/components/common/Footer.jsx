import React  from 'react';

import GHLogo from '../../assets/github-mark.png';

export const Footer = () => (
    <footer className="pt-3 pb-3">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <span>
                    React Demo App
                    </span>
                    <span className='float-right'>
                        <a href="https://github.com/AlexxIV/react-demo-app" target='_blank' rel='noopener noreferrer'>
                            <img src={GHLogo} alt="Github Logo" className="img-fluid"/>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    </footer>
);
