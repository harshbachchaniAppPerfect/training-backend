import requests
import pytest


BASE_URL = "http://localhost:8000"


# def test_validate_user1():
#     # params={"name":"Harsh Bachchani"}
#     existed_user = {"email": "harsh@gmail.com", "password": "Harsh1234"}
#     response=requests.post(BASE_URL+"/api/login",json=existed_user)
#     result=response.status_code
#     assert result==200
#     print(response.json())


# def test_check_user2():
#     existed_user = {"email": "harshcom", "password": "Harsh1234"}
#     response=requests.post(BASE_URL+"/api/login",json=existed_user)
#     result=response.status_code
#     assert result==400
#     print(response.json())
    
def test_signup1():
    new_user={"email":"harsh@gmail.com","password":"Harsh1234","username":"harsh","address":"Udaipur"}
    response=requests.post(BASE_URL+"/api/signup",json=new_user)
    result=response.status_code
    data=response.json()
    assert result==200
    assert data['email']=='harsh@gmail.com'
    assert data['password']=='Harsh1234'
    assert data['username']=='harsh'
    assert data['address']=='Udaipur'


mytestdata=[
    {"email":"harsh","password":"Harsh1234","username":"harsh","address":"Udaipur"},
    {"email":"harsh@gmail.com","password":"Harsh","username":"harsh","address":"Udaipur"},
    {"email":"harsh@gmail.com","password":"Harshere","username":"harsh","address":"Udaipur"},
    {"email":"","password":"Harsh1234","username":"harsh","address":"Udaipur"},
    {"email":"harsh@gmail.com","password":"","username":"harsh","address":"Udaipur"},
    {"email":"harsh@gmail.com","password":"Harsh1234","username":"","address":"Udaipur"},
    {"email":"harsh@gmail.com","password":"Harsh1234","username":"harsh","address":""},
    {"email":"harsh@gmail.com","password":"Harsh1234","username":"harsh","address":"Udaipur"}
    
    ]
@pytest.mark.parametrize('payload',mytestdata)
def test_signup2(payload):
    response=requests.post(BASE_URL+"/api/signup",json=payload)
    result=response.status_code
    data=response.json()
    assert result==400
    print("My error is ",data)

@pytest.mark.parametrize('payload',mytestdata)
def test_signup3(payload):
    response=requests.post(BASE_URL+"/api/signup",json=payload)
    result=response.status_code
    data=response.json()
    if result==400:
        assert result==400
        print("My error is ",data)
    else:
        assert result==200
        assert data['email']=='harsh@gmail.com'
        assert data['password']=='Harsh1234'
        assert data['username']=='harsh'
        assert data['address']=='Udaipur'
        
    print("My error is ",data)

    



    