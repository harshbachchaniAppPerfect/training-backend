from mock_example import get_todo




def test_get_todo():
    response=get_todo(1)
    assert type(response) is dict


def test_get_todo_mocked(mocker):
    mock_data={
        "userId":1,
        "name":"User"
    }
    mock_response=mocker.MagicMock()
    mock_response.json.return_value = mock_data
    mocker.patch('requests.get',return_value=mock_response)
    result=get_todo(1)
   
    assert result==mock_data
    assert type(result) is dict
    


