import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.form`
width: 400px;
background: #C3B8D9;
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
img {
  width: 100px;
  margin: 10px 0 20px;
}
p {
  color: #E30707;
  margin-bottom: 15px;
  font-weight: bold;
  padding: 10px;
  width: 100%;
  text-align: center;
}
input {
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #282828;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #502D73;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    &:hover {
      background: #6a468e;
    }
  }
hr {
  margin: 20px 0;
  border: none;
  border-bottom: 1px solid #cdcdcd;
  width: 100%;
}
a {
  font-size: 16;
  font-weight: bold;
  color: white;
  text-decoration: none;
}
h2 {
    margin-bottom: 30px;
    color: #282828;
}
`;