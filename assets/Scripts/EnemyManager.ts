import { _decorator, Component, Node, Prefab, instantiate, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    //敵機預設體
    @property(Prefab)
    enemyPre: Prefab = null

    start() {
        //每隔2秒，創建一個敵人
        this.schedule(() => {
            //創建敵機
            let enemy = instantiate(this.enemyPre)
            const nodePosition = this.node.getPosition()

            //因為場景中心點為0，所以把隨機寬度減一半，若場景x軸的0在最左邊，則不需要減這個一半
            const pointX = Math.floor(Math.random() * 480) - 240

            enemy.setParent(director.getScene().getChildByName('Canvas'))

            enemy.setPosition(pointX, nodePosition.y)
        }, 2)
    }

    update(deltaTime: number) {
        
    }
}


