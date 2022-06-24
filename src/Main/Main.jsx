import React, { useState } from 'react';

//
// Проверяем число на валидность
function isValidNumber(value) {
  return typeof value === 'number';
}
//
// Проверяем дату на валидность
function isValidDate(value) {
  let isValid = new Date(value);
  return (
    null !== isValid &&
    !isNaN(isValid) &&
    'undefined' !== typeof isValid.getDate
  );
}

function New(props) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

function Popular(props) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

function Article(props) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

//
// Обертка для функционального компонента DateTime, форматирующая дату к требуемому виду
// Для дат старше более 10 дней сделал вывод в начальном формате
function DateTimePretty(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        strTimestamp: null,
      };
    }
    // Начальный рендер
    componentDidMount() {
      let now = moment();
      let initialTimestamp = moment(this.props.date);
      let diffDays = now.diff(initialTimestamp, 'days');
      let diffHours = now.diff(initialTimestamp, 'hours');
      let strTimestamp = isValidDate(initialTimestamp)
        ? diffDays > 10
          ? initialTimestamp.format('DD.MM.YYYY H:mm:ss')
          : diffDays > 1
          ? diffDays + ' дн. назад'
          : diffHours > 1
          ? '5 часов назад'
          : '12 минут назад'
        : 'Неправильная дата';
      console.log(strTimestamp);
      this.setState({
        strTimestamp: strTimestamp,
      });
    }
    componentDidUpdate() {}
    componentWillUnmount() {}

    render() {
      // return <Component {...this.props} />;
      return <Component date={this.state.strTimestamp} />;
    }
  };
}
// Создаем компонент для вывода
const WrappedDatetime = DateTimePretty(Video);
//
//

function List(props) {
  return props.list.map((item) => {
    switch (item.type) {
      case 'video':
        return <Video {...item} />;

      case 'article':
        return <Article {...item} />;
    }
  });
}

export default function App() {
  const [list, setList] = useState([
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      views: 50,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      views: 12,
    },
    {
      type: 'article',
      title: 'Невероятные события в неизвестном поселке...',
      views: 175,
    },
    {
      type: 'article',
      title: 'Секретные данные были раскрыты!',
      views: 1532,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      views: 4253,
    },
    {
      type: 'article',
      title: 'Кот Бегемот обладает невероятной...',
      views: 12,
    },
  ]);

  return <List list={list} />;
}
