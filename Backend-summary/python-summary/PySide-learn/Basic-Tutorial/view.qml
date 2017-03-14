import QtQuick 1.0

Rectangle {
    id: page
    width: 200
    height: 200
    color: "lightgray"
    Text {
        id: helloText
        text: "Hello World"
        y: 30
        anchors.horizontalCenter: page.horizontalCenter
        font.pointSize: 24
        font.bold: true
    }
}
