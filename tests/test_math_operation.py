from math_operation import add,product
import pytest

@pytest.mark.number
def test_add():
    assert add(2,3)==5
    assert add(-1,1)==0
    assert add(-1,-1)==-2

@pytest.mark.skip(reason='skipping this test')
def test_product():
    assert product(3,4)==12
    assert product(4)==8

@pytest.mark.strings
def test_addString():
    assert add('2','3')=='23'
    assert add('hello','hii')=='hellohii'

# arg1 arg2 ... argn , result, iterator
@pytest.mark.parametrize('x, y, res',[
    (7,3,10),
    (2.3,2.6,4.9),
    ('2','3','23')
])
def test_addAll(x,y,res):
    assert add(x,y)==res
