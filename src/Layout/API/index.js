

export const getBeneficiaireAge=()=>{
    return fetch('https://dummyjson.com/carts')
    .then(res => res.json());  
}

export const getBeneficiaire = () => {
    return fetch('http://localhost:8080/beneficiaire')
      .then(res => res.json());
  };
  
  export const getRecentReport = () => {
    return fetch('http://localhost:8080/report')
      .then(res => res.json());
  };
  
  export const getRecentProject = () => {
    return fetch('http://localhost:8080/petitprojet')
      .then(res => res.json());
  };



 
  
  