import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { EnemyControl } from './EnemyControl';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {
    @property
    speed: Number = 800

    start() {
        let collider = this.getComponent(Collider2D)

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }
    }

    update(deltaTime: number) {
        const bulletPositon = this.node.getPosition()

        //子彈移動
        this.node.setPosition(bulletPositon.x, bulletPositon.y + 800 * deltaTime)

        //子彈出螢幕消毀
        if (bulletPositon.y > 410) {
            this.node.destroy()
        }
    }

    onCollisionEnter(other) {
        //如果碰到敵人，銷毀自己，讓敵人死亡
        //1.讓敵人死亡
        //2.銷毀自己

        //tag來自enemy的BoxCollider2D組件的tag
        if (other.tag === 1) {
            //銷毀敵人
            other.getComponent(EnemyControl).die()

            //銷毀自己
            //這個if判斷式是因為若子彈在邊界去碰撞到飛機，因為子彈不會停會繼續飛，因此有機會先觸發『子彈出螢幕消毀』後才執行『碰撞自毀』
            //因此這邊多加一個當碰撞發生時判斷子彈是否還存在，存在就自毀，不存在就代表已經由超出場景那邊先銷毀了
            if (this.node) {
                this.node.destroy()
            }
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        // console.log('onBeginContact');

        setTimeout(() => {
            this.onCollisionEnter(otherCollider)
        }, 50);
    }
    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        // console.log('onEndContact');
    }
    onPreSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次将要处理碰撞体接触逻辑时被调用
        // console.log('onPreSolve');
    }
    onPostSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次处理完碰撞体接触逻辑时被调用
        // console.log('onPostSolve');
    }
}

/**
 * 開啟碰撞檢測
 * https://docs.cocos.com/creator/manual/zh/physics-2d/physics-2d-contact-callback.html
 * 2.x寫法： director.getCollisionManager().enabled = true
 * 3.x： 需添加Rigidbody組件
 */

/**
 * 3.x的物理碰撞
 * box2d在进行物理迭代的时候锁定了，不要在碰撞时进行销毁这些操作
 * https://forum.cocos.org/t/topic/106186
 * 
 * 有两个解决办法：
 * ①等待物理回调销毁
 * ②延迟一帧后销毁
 */

// ①等待物理回调销毁
// director.once(Director.EVENT_AFTER_PHYSICS, () => {
//     selfCollider.node.destroy()
// })

// ②延迟一帧后销毁
// setTimeout(() => {
//     selfCollider.node.destroy()
// }, 50);