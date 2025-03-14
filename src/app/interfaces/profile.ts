export interface Profile {
  id: number;               
  nombre: string;           
  apellido: string;         
  correo_electronico: string; 
  imageurl?: string;        
  ciudad?: string;          
  provincia?: string;       
  pais?: string;            
  descripcion?: string;     
}
