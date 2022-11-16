import { Prisma, PrismaClient } from '@prisma/client';
import React from 'react'

interface _RegisterFormState {
    name:string,
    email:string,
    gender:string,
    password:string,
    role:string
}
  

class RegisterForm extends React.Component<{}, _RegisterFormState> {
    constructor(props:any){
        super(props);
        this.state = {
            name:null,
            email:null,
            gender:null,
            password:null,
            role:null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event:any) {
        const target = event.target;
        var value = target.value as _RegisterFormState;
        const name = target.name as string;
        const role = target.role as string;
        this.setState({
            [name]: value,
            [role]:value
        } as any);        
    }

    submit(){
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-sm">
                        <br /><br />
                        <h3>Register Form</h3><br />
                        <form>
                            <div className="row">
                                <div className="col">
                                    <label>Full name :</label>
                                    <input type="text" className="form-control" name="name" onChange={this.handleInputChange} tabIndex={1} />
                                </div>
                                <div className="col">
                                    <label>Password :</label>
                                    <input type="password" className="form-control" name="password" onChange={this.handleInputChange} tabIndex={3} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Email :</label>
                                    <input type="email" className="form-control" name="email" onChange={this.handleInputChange} tabIndex={2} />
                                </div>
                                <div className="col">
                                    <label>Confirm Password :</label>
                                    <input type="password" className="form-control" name="password_check" onChange={this.handleInputChange} tabIndex={4}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Gender :</label><br />
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="inlineRadiom" value="male" checked={this.state.gender === "male"} onChange={this.handleInputChange} />
                                        <label className="form-check-label" htmlFor="inlineRadiom">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="inlineRadiof" value="female" checked={this.state.gender === "female"} onChange={this.handleInputChange} />
                                        <label className="form-check-label" htmlFor="inlineRadiof">Female</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="inlineRadion" value="nonbinary" checked={this.state.gender === "nonbinary"} onChange={this.handleInputChange} />
                                        <label className="form-check-label" htmlFor="inlineRadion">Non-binary</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="inlineRadioe" value="empty" checked={this.state.gender === "empty"} onChange={this.handleInputChange} />
                                        <label className="form-check-label" htmlFor="inlineRadioe">Empty</label>
                                    </div>
                                </div>
                            </div>
                                <div className="form-group col-md-6">
                                    <label>Role:</label><br />
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="role" id="inlineRadiom" value="farmer" checked={this.state.role === "farmer"} onChange={this.handleInputChange} />
                                        <label className="form-check-label" htmlFor="inlineRadioz">Farmer</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="role" id="inlineRadiof" value="customer" checked={this.state.role === "customer"} onChange={this.handleInputChange} />
                                        <label className="form-check-label" htmlFor="inlineRadiov">Customer</label>
                                    </div>
                                </div>
                                <div className="col-md-12 text-center">
                                    <button type="submit" className="btn btn-primary" onClick={()=>this.submit()}>Submit</button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        )  
    }
}

export default RegisterForm;