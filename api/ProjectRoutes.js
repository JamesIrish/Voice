import {Router} from 'express';
import DatabaseClient from "./DatabaseClient";

export default class ProjectRoutes {
  
  static routes = () => {
    let routes = new Router();
    
    routes.get('/', ProjectRoutes._getAllProjects);
    
    return routes;
  };
  
  static _getAllProjects = (req, res) => {
    res.json([{id: 1, name: 'Hello'}, {id: 2, name: 'Goodbye'}]);
  }
}