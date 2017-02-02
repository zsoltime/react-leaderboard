const data = {
  team: 'Simpleton',
  people: [
    {
      name: 'Gerald Reid',
      avatar: 'http://uinames.com/api/photos/male/43.jpg',
      score: 43069,
    },
    {
      name: 'David Nelson',
      avatar: 'http://uinames.com/api/photos/male/25.jpg',
      score: 35924,
    },
    {
      name: 'Samantha Carter',
      avatar: 'http://uinames.com/api/photos/female/24.jpg',
      score: 11342,
    },
    {
      name: 'Jerry Hamilton',
      avatar: 'http://uinames.com/api/photos/male/34.jpg',
      score: 30193,
    },
    {
      name: 'Kathy Morrison',
      avatar: 'http://uinames.com/api/photos/female/23.jpg',
      score: 43193,
    },
    {
      name: 'Kathy Crawford',
      avatar: 'http://uinames.com/api/photos/female/9.jpg',
      score: 14392,
    },
  ],
};

const Player = props => (
  <li className="player">
    <div className="player__img" style={{ backgroundImage: `url(${props.image}` }} />
    <div className="player__name">{props.name}</div>
    <div className="player__score">{props.score} <small>points</small></div>
  </li>
);

Player.propTypes = {
  name: React.PropTypes.string,
  image: React.PropTypes.string,
  score: React.PropTypes.number,
};

const List = (props) => {
  const compare = (a, b) => {
    if (props.sortBy === 'score') {
      return (props.order === 1) ? (a.score < b.score) : (a.score > b.score);
    } else if (props.sortBy === 'name') {
      return (props.order === 1) ? (a.name > b.name) : (a.name < b.name);
    }
    return 0;
  };
  const list = props.people.sort(compare);
  const people = list.map((person, id) => (
    <Player
      key={id}
      name={person.name}
      score={person.score}
      image={person.avatar}
    />
  ));
  return (
    <ul className="team">
      {people}
    </ul>
  );
};

List.propTypes = {
  people: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      avatar: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
    })).isRequired,
  sortBy: React.PropTypes.oneOf(['score', 'name']).isRequired,
  order: React.PropTypes.oneOf([1, -1]).isRequired,
};

const ListHeader = ({ sort }) => (
  <div className="sort">
    <div>Sort by:</div>
    <button
      className="sort__btn"
      id="name"
      onClick={event => sort(event)}
    >Name</button>
    <button
      className="sort__btn"
      id="score"
      onClick={event => sort(event)}
    >Score</button>
  </div>
);

ListHeader.propTypes = {
  sort: React.PropTypes.func,
};

function sortList(state, newSortBy) {
  let order = state.order;
  let sortBy = state.sortBy;
  if (newSortBy === sortBy) {
    // if already sorted by this, just change order
    order *= -1;
  } else {
    sortBy = newSortBy;
  }
  return {
    order,
    sortBy,
  };
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      team: data.team,
      people: data.people,
      sortBy: 'score',
      order: 1,
    };
  }
  sortList(event) {
    const sortBy = event.target.id;
    this.setState(prevState => sortList(prevState, sortBy));
  }
  render() {
    return (
      <div className="board">
        <h2 className="board__title">Team {this.state.team}</h2>
        <ListHeader
          sort={event => this.sortList(event)}
        />
        <List
          people={this.state.people}
          sortBy={this.state.sortBy}
          order={this.state.order}
        />
      </div>
    );
  }
}

ReactDOM.render(<Board />, document.getElementById('app'));
