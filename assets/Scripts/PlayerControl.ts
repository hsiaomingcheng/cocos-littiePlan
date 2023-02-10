 import { _decorator, Component, Node, Prefab, instantiate, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(Prefab)
    bulletPre: Prefab = null 

    start() {
        //飛機點擊拖拉移動
        this.node.on(Node.EventType.TOUCH_MOVE, (event) => {
            const xPoint = event.getLocation().x
            const yPoint = event.getLocation().y
            this.node.setPosition(xPoint - 240, yPoint - 400)
        })

        //攻擊 計時器
        this.schedule(() => {
            const bullet = instantiate(this.bulletPre)
            const xPoint = this.node.getPosition().x
            const yPoint = this.node.getPosition().y

            //將子彈加到場景上
            bullet.setParent(director.getScene().getChildByName('Canvas'))

            //設定子彈位置
            bullet.setPosition(xPoint, yPoint + 70)
        }, 1)
    }

    update(deltaTime: number) {
        
    }
}


