from filetesting import StudentDB
import pytest



# db=None
# this method will be executed first on running the test case which will intialize all the data

# def setup_module(module):
#     print('================== Setup Module ====================')
#     global db
#     db=StudentDB()
#     db.connect('data.json')

# run after completion of all the test cases
# def teardown_module(module):
#     print('================== TearDown Module ====================')
#     db.close()


# giving scope module run this at the beginning of the test case not at the beginning of every test case
@pytest.fixture(scope='module')
def db():
    print('==========Setup======')
    db=StudentDB()
    db.connect('data.json')
    yield db;
    print('================== TearDown Module ====================')
    db.close()

# you can pass this db to test so they can use them like below:
# def test_scott_data(db):
#     scott_data=db.get_data('Scott')
#     assert scott_data['id']==1
#     assert scott_data['name']=='Scott'
#     assert scott_data['result']=='Pass'


def test_scott_data(db):
    scott_data=db.get_data('Scott')
    assert scott_data['id']==1
    assert scott_data['name']=='Scott'
    assert scott_data['result']=='Pass'

def test_harry_data(db):
    scott_data=db.get_data('Harry')
    assert scott_data['id']==2
    assert scott_data['name']=='Harry'
    assert scott_data['result']=='Fail'