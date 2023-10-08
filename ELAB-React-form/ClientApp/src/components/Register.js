import React, { Component } from 'react';

export class Register extends Component {
    static displayName = Register.name;

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                firstName: '',
                lastName: '',
                email: '',
                promocode: '',
            },
            loading: false, 
            registrationSuccess: false,
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            userData: {
                ...prevState.userData,
                [name]: value,
            },
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { userData } = this.state;
        try {
            this.setState({ loading: true });

            const response = await fetch('register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                this.setState({ registrationSuccess: true });
            } else {
                this.setState({ registrationSuccess: false });
            }
        } catch (error) {
            this.setState({ registrationSuccess: false });
        } finally {
            this.setState({ loading: false }); 
        }
    };

    render() {
        const { userData, loading, registrationSuccess } = this.state;

        return (
            <div>
                <h1>Registracija</h1>
                {registrationSuccess ? (
                    <p>Uspesna registracija!</p>
                ) : (
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">Ime</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={userData.firstName}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Prezime</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={userData.lastName}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="promocode">Promo Code</label>
                            <input
                                    type="text"
                                    className="form-control"
                                    id="promocode"
                                    name="promocode"
                                    value={userData.promocode}
                                    onChange={this.handleInputChange}
                                    required
                                    minLength={8 }
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                )}
            </div>
        );
    }
}
