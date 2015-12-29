/**
*  文 件 名：BaseScene.ts
*  功    能： 场景基类
*  内    容： 将场景自适应到容器的100%
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
declare class BaseScene extends egret.gui.SkinnableComponent {
    /**组件是否初始化完毕*/
    inited: boolean;
    constructor();
    /**组建创建完毕的情况下，添加到舞台时执行*/
    onEnable(): void;
    /**移除界面时执行*/
    onRemove(): void;
    /**销毁界面时执行*/
    onDestroy(): void;
}
/**
 *  文 件 名：LayerManager.ts
 *  功    能： 图层管理类
 *  内    容： 游戏图层、场景管理
 *  作    者： 羊力大仙
 *  生成日期：2015/9/10
 *  修改日期：2015/9/10
 *  修改日志：
 */
declare class LayerManager {
    /**单例*/
    private static instance;
    /**Stage*/
    stage: egret.Stage;
    /**UIStage*/
    uiStage: egret.gui.UIStage;
    /**Main*/
    main: egret.DisplayObjectContainer;
    /**UIStage场景层*/
    uiSceneLayer: egret.gui.Group;
    /**UIStage弹框层*/
    uiPopLayer: egret.gui.Group;
    /**当前场景*/
    private curScene;
    /**场景动画时间*/
    private tweenTime;
    static getInstance(): LayerManager;
    /**初始化*/
    initialize(main: egret.DisplayObjectContainer): void;
    /**
     * 运行场景
     * @param 运行的场景名
     * @param 切换场景过渡动画类型
     * @param 是否销毁上一场景
     */
    runScene(nextScene: BaseScene, tween?: STween, destroy?: boolean): void;
    /**场景过渡动画*/
    private playSceneTween(curScene, nextScene, tween);
}
/**场景过渡动画*/
declare enum STween {
    None = 0,
    /**新场景从右边入场*/
    R = 1,
}
