import styled from "@emotion/styled";

const ListDiv = styled.div`
  padding-bottom: 1rem;
  max-width: 756px;
  margin: 0 auto !important;
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const ListItem = styled.div`
  width: 100%;
  height: auto;
  min-height: 120px;
  background: #ffffff;
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding: 20px;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03), 0px 15px 12px rgba(0, 0, 0, 0.1);
  .title {
    margin-bottom: 10px;
    font-weight: bold;
  }
  .author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        margin-left: 10px;
        // margin-bottom: 0px;
        color: darkgrey;
        font-size: 17px;
        &.admin {
          display: flex;
          align-items: center;
        }
        &.time {
          margin-left: 15px;
          color: darkgrey;
          margin-bottom: 0px;
          font-size: 10px;
        }
      }
    }
  }
  // p {
  //   &.time {
  //     color: darkgrey;
  //     margin-bottom: 0px;
  //     font-size: 10px;
  //   }
  // }

  a {
    color: black;
    text-decoration: none;
    .title {
      font-weight: bold;
    }
  }
  .memotitle {
    // text-decoration: underline;
    font-weight: bold;
    font-size: 20px;
  }
  .memocontent {
    font-style: italic;
    font-family: San-serif;
  }
  .memopage {
  }
`;

const GNBDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 756px;
  margin: 0 auto !important;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;

  .search {
    display: grid;
    min-width: 40%;
    grid-template-columns: 8fr 2fr;
    grid-template-rows: auto;

    input {
      padding: 5px 20px;
      border-radius: 15px 0px 0px 15px;
      border: 0.5px solid #c6c6c6;
      height: 100%;
      &:active,
      &:focus {
        outline: none;
      }
    }
    button {
      height: 100%;
      border: 0.5px solid #c6c6c6;
      border-radius: 0px 15px 15px 0px;
      margin-bottom: -1px;
    }
  }

  @media (max-width: 756px) {
    width: 90%;
    .search {
      width: auto;
      input {
        padding: 5px 10px;
        width: 100%;
      }
    }
    .btn {
      font-size: 0.75rem;
      margin-left: 1rem;
    }
  }
`;

const FooterDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    width: auto;
    border-radius: 15px;
    padding: 5px 10px;
    font-weight: bold;
  }
`;

const BookListItem = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  height: auto;

  min-height: 30px;
  background: #e0ccb8;
  margin-top: 3vh;
  margin-bottom: 2vh;

  padding: 20px 20px 0px 20px;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03), 0px 15px 12px rgba(0, 0, 0, 0.1);
  .title {
    width: 100%;
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: left;
  }
  .readDate {
    width: 100%;
    font-size: 13px;
    text-align: right;
  }
  a {
    color: black;
    text-decoration: none;
    .title {
      font-weight: bold;
    }
  }
`;

export { ListDiv, ListItem, GNBDiv, FooterDiv, BookListItem };
