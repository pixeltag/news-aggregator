import React from 'react'
import Logo from '../Icons/Logo'

export default function Header() {
    return (
        <header data-testid="header" className="border-bottom  mb-4">
            <div className="container">
                <div className="d-flex flex-column flex-md-row align-items-center pt-3 pb-3">
                    <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none" data-testid="logo">
                        <Logo />
                        <span className="fs-4 mx-3">News Aggregator</span>
                    </a>

                    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <a className="me-3 py-2 link-body-emphasis text-decoration-none" href="#">Features</a>
                        <a className="me-3 py-2 link-body-emphasis text-decoration-none" href="#">Enterprise</a>
                        <a className="me-3 py-2 link-body-emphasis text-decoration-none" href="#">Support</a>
                        <a className="py-2 link-body-emphasis text-decoration-none" href="#">Pricing</a>
                    </nav>
                </div>
            </div>
        </header>
    )
}