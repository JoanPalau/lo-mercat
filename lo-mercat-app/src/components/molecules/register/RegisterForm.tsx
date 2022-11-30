import React, { MouseEventHandler } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';


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
        this.submit = this.submit.bind(this);
    }

    handleInputChange(event:any) {
        const target = event.target;
        var value = target.value as _RegisterFormState;
        const name = target.name as string;
        console.log("changed" + target.name)
        this.setState({
            [name]: value,
        } as any);        
    }

    async submit(event :any){
        event.preventDefault();
        let x = await fetch(
            '/api/user/',
            {        
                body: JSON.stringify({
                    "name": this.state.name,
                    "password": this.state.password,
                    "email": this.state.email,
                    "gender": this.state.gender,
                    "role": this.state.role,
                }),
                headers:new Headers({ 'Content-Type': 'application/json', Accept: 'application/json',}),
                method: 'POST'
            }
        )
        window.location.href = '/auth/signin'
    }
    render(){
        return(
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
            >
            <FormControl>
                <Typography variant="h3">Register Form</Typography><br />
                <Box sx={{ mx: 'auto', height: 30 }}/>
                    <div className="col">
                        <label>Full name :</label>
                        <TextField variant="filled" name="name" onChange={this.handleInputChange} tabIndex={1} />
                    </div>
                    <Box sx={{ mx: 'auto', height: 20 }}/>
                    <div className="col">
                        <label>Email :</label>
                        <TextField variant="filled" type="email" className="form-control" name="email" onChange={this.handleInputChange} tabIndex={2} />
                    </div>
                    <Box sx={{ mx: 'auto', height: 20 }}/>
                    <div className="col">
                        <label>Password :</label>
                        <TextField variant="filled" type="password" className="form-control" name="password" onChange={this.handleInputChange} tabIndex={3} />
                    </div>
                    <Box sx={{ mx: 'auto', height: 20 }}/>
                    <div className="col">
                        <label>Confirm Password :</label>
                        <TextField variant="filled" type="password" className="form-control" name="password_check" onChange={this.handleInputChange} tabIndex={4}/>
                    </div>
                    <RadioGroup name="gender" onChange={this.handleInputChange}>
                        <label>Gender :</label><br />
                        <FormControlLabel name="gender" value="male" control={<Radio />} label="Male"  />
                        <FormControlLabel name="gender" value="female" control={<Radio />} label="Female"  />
                        <FormControlLabel name="gender" value="nonbinary" control={<Radio />} label="Non-binary"  />
                        <FormControlLabel name="gender" value="empty" control={<Radio />} label="Empty"  />
                    </RadioGroup>
                    <Box sx={{ mx: 'auto', height: 20 }}/>
                    <RadioGroup name="role" onChange={this.handleInputChange}>
                        <label>Role :</label><br />
                        <FormControlLabel name="role" value="FARMER" control={<Radio />} label="Farmer"  />
                        <FormControlLabel name="role" value="CUSTOMER" control={<Radio />} label="Customer"  />
                    </RadioGroup>
                <Button type="submit" variant="contained" onClick={this.submit}>
                    Submit
                </Button>
            </FormControl>
            </Grid>
        )  
    }
}

export default RegisterForm;