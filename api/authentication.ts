import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5000/auth/login', { email, password });
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Login failed 1');
    }
  } catch (error) {
    throw new Error('Login failed 2'); 
  }
};


export const register = async (email: string, password: string, name: string, profilePic: string) => {
  try{
    const response = await axios.post('http://localhost:5000/auth/register', { email, password, name, profilePic });
    console.log(response);
    if(response.status === 201){
      return response.data;
    }
    else{
      throw new Error('Register failed 1');
    }
  } catch (error) {
    throw new Error('Register failed 2');
  }
};

export const getDetails = async (token: string) => {
  try{
    const response = await axios.post('http://localhost:5000/auth/details', { token : token });
    if(response.status === 200){
      return response.data;
    }
    else{
      throw new Error('Get details failed 1');
    }
  } catch (error) {
    throw new Error('Get details failed 2');
  }
}
