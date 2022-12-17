import React from 'react';

class registerForm extends React.Component{
    constructor(){
        super();
        this.state = {
            name:null,
            email:null,
            gender:null,
            password:null,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;
        const email = target.email;
        const password = target.password;
        this.setState({
            [name]: name,
            [password]: password,
            [email]: email,
        });
        
        
    }

    async submit(){
        let x = await fetch(
        '/api/user/',
        {        
            body: JSON.stringify({
                name: this.name,
                password: this.password,
                email: this.email,
            }),
            headers:new Headers({ 'Content-Type': 'application/json', Accept: 'application/json',}),
            method: 'POST'
        }
    )
    }

    render(){
        return(
            <div>
                <div class="row">
                    <div class="col-sm">
                        <br /><br />
                        <h3>Register Form</h3><br />
                        <form>
                            <div class="row">
                                <div class="col">
                                    <label>Full name :</label>
                                    <input type="text" class="form-control" name="name" onChange={this.handleInputChange} tabIndex="1" />
                                </div>
                                <div class="col">
                                    <label>Password :</label>
                                    <input type="password" class="form-control" name="password" onChange={this.handleInputChange} tabIndex="3" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label>Email :</label>
                                    <input type="email" class="form-control" name="email" onChange={this.handleInputChange} tabIndex="2" />
                                </div>
                                <div class="col">
                                    <label>Confirm Password :</label>
                                    <input type="password" class="form-control" name="password_check" onChange={this.handleInputChange} tabIndex="4"/>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Gender :</label><br />
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="inlineRadiom" value="male" checked={this.state.gender === "male"} onChange={this.handleInputChange} />
                                        <label class="form-check-label" for="inlineRadiom">Male</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="inlineRadiof" value="female" checked={this.state.gender === "female"} onChange={this.handleInputChange} />
                                        <label class="form-check-label" for="inlineRadiof">Female</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="inlineRadion" value="nonbinary" checked={this.state.gender === "nonbinary"} onChange={this.handleInputChange} />
                                        <label class="form-check-label" for="inlineRadion">Non-binary</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="inlineRadioe" value="empty" checked={this.state.gender === "empty"} onChange={this.handleInputChange} />
                                        <label class="form-check-label" for="inlineRadioe">Empty</label>
                                    </div>
                                </div>
                                <div class="col-md-12 text-center">
                                    <button type="submit" class="btn btn-primary" onClick={()=>this.submit()}>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )  
    }
}

export default registerForm;