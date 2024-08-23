from typing import Dict
import requests

def get_todo(id:int)->Dict:
    if(id==-1):
        response=requests.get(f"http://jsonplaceholder.typicode.com/todos")
        return response.json();
    response=requests.get(f"http://jsonplaceholder.typicode.com/todos/{id}")
    return response.json();