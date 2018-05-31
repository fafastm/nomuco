#!/usr/bin/env node

const { h, render, Component, Color } = require('ink')
const path = require('path')
const QuickSearch = require('ink-quicksearch')
const opn = require('opn')
const termImg = require('term-img')
const terminalImage = require('terminal-image')

const selectHandler = item => {

  if(item.url) {
    opn(item.url, {wait: false})
  }

  if(item.action) {
    return item.action()
  }

}

const indicatorComponent = ({isSelected}) => {
  return isSelected ? '😎  ' : '   '
}

const itemComponent = ({isSelected, children}) => {
  const color = isSelected ? '#FE9A2E' : '#ddd'
  return <Color hex={color}>{children}</Color>
}

const items = [
  {
    label: 'Twitter',
    url: 'https://twitter.com/nomuco_'
  },
  {
    label: 'GitHub',
    url: 'https://github.com/nomuco'
  },
  {
    label: 'Exit',
    action: process.exit
  }
]

const App = () => {

  return (
    <div className={App}>
      <div>
        Hi, I'm nomuco. <br/>
        I'm web developer. Student of Kanazawa Institute of Technology.<br/><br/>
        My status <br/><br/>
        <Color hex='#FE9A2E'> Golang </Color> :  ■■■■□□□□□□<br/>
        <Color hex='#FE9A2E'> React </Color>  :  ■■■■□□□□□□ <br/><br/>
        Etc...more 😎
      </div>

      <br/>

      <QuickSearch
        items={items}
        itemComponent={itemComponent}
        indicatorComponent={indicatorComponent}
        onSelect={selectHandler}
      />
    </div>
  )

}

const imageFallback = async () => {
  const image = await terminalImage.file(path.join(__dirname + '/assets/me.png'));
  console.log(image)
}

termImg(path.join(__dirname + 'assets/me.png'), {width: '400px', fallback: imageFallback})
render(<App/>)
