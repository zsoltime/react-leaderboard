const data = {
  team: 'Simpleton',
  players: [
    {
      id: 1,
      name: 'Gerald Reid',
      avatar: 'http://uinames.com/api/photos/male/43.jpg',
      score: 43069,
    },
    {
      id: 2,
      name: 'David Nelson',
      avatar: 'http://uinames.com/api/photos/male/25.jpg',
      score: 35924,
    },
    {
      id: 3,
      name: 'Samantha Carter',
      avatar: 'http://uinames.com/api/photos/female/24.jpg',
      score: 11342,
    },
    {
      id: 4,
      name: 'Jerry Hamilton',
      avatar: 'http://uinames.com/api/photos/male/34.jpg',
      score: 30193,
    },
    {
      id: 5,
      name: 'Kathy Morrison',
      avatar: 'http://uinames.com/api/photos/female/23.jpg',
      score: 43193,
    },
    {
      id: 6,
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
    <div className="player__score">
      {props.score} <small>points</small>
    </div>
  </li>
);

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
};

const List = (props) => {
  if (!props.players.length) {
    return (
      <li className="player player--no-player">
        There's no I in team. Actually, there is noone in this one...
      </li>
    );
  }
  const compare = (a, b) => {
    if (props.sortBy === 'score') {
      return (props.order === 1) ? (a.score < b.score) : (a.score > b.score);
    } else if (props.sortBy === 'name') {
      return (props.order === 1) ? (a.name > b.name) : (a.name < b.name);
    }
    return 0;
  };
  const players = props.players
    .sort(compare)
    .map(person => (
      <Player
        key={person.id}
        name={person.name}
        score={person.score}
        image={person.avatar}
      />
    ));
  return (
    <ul className="team">
      {players}
    </ul>
  );
};

List.propTypes = {
  players: React.PropTypes.arrayOf(
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
  sort: React.PropTypes.func.isRequired,
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
  constructor(props) {
    super(props);
    this.state = {
      team: props.team,
      players: props.players,
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
          players={this.state.players}
          sortBy={this.state.sortBy}
          order={this.state.order}
        />
      </div>
    );
  }
}

Board.defaultProps = {
  players: [],
};

Board.propTypes = {
  team: React.PropTypes.string.isRequired,
  players: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      avatar: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
    }),
  ),
};

ReactDOM.render(
  <Board {...data} />,
  document.getElementById('app')
);
