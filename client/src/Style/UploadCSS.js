import styled from "@emotion/styled";

const UploadDiv = styled.div`
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 0rem;
  margin-bottom: 1rem;
`;

const UploadForm = styled.form`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  #title {
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    // margin-bottom: 10px;
    &:active,
    &:focus {
      outline: none;
    }
  }
  
  }
  textarea {
    min-height: 350px;
    resize: none;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: grey;
      border-radius: 15px;
      background-colip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #c6c6c6;
      border-radius: 15px;
      box-shadow: inset 0px 0px 5px whitesmoke;
    }
  }
  .page1 {
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    margin-bottom: 10px;
    &:active,
    &:focus {
      outline: none;
    }
    display: inline-block;
    width: 50px;
    height: 25px;
    margin-right: 20px;
  }

  .page2 {
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    margin-bottom: 10px;
    &:active,
    &:focus {
      outline: none;
    }
    display: inline-block;
    width: 50px;
    height: 25px;
  }
  #memotitle {
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
  }
  #memoSentence {
    min-height: 120px;
    resize: none;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    // padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: grey;
      border-radius: 15px;
      background-colip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #c6c6c6;
      border-radius: 15px;
      box-shadow: inset 0px 0px 5px whitesmoke;
    }
  }
  #memoContent {
    min-height: 200px;
    resize: none;
    border-radius: 10px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: grey;
      border-radius: 15px;
      background-colip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #c6c6c6;
      border-radius: 15px;
      box-shadow: inset 0px 0px 5px whitesmoke;
    }
  }
  label {
    font-weight: bold;
    margin-top: 10px;
    margin-right: 10px;
  }
`;

const UploadButtonDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 15px;
    padding: 5px 10px;
    background-color: black;
    color: white;
    border: 1px solid black;
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
    &.cancel {
      margin-right: 10px;
      background-color: white;
      color: black;
      border: 1px solid black;
      &:hover {
        background-color: black;
        color: white;
        border: 1px solid black;
      }
    }
  }
`;

export { UploadDiv, UploadForm, UploadButtonDiv };
