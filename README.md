# Student-Management-System
1. 主要使用vue搭建简单的学生管理系统，功能：增删查改，选中
2. 双向绑定元素的相关属性
3. 使用v-for创建储存的学生信息列表——动态创建，当绑定的数据被改变后，对导致重绘；解决方案：不直接删除，对应的数据做隐藏，并标注，使其不影响在之后的操作
4. 待完善：批量删除功能；设置一定时间，或用户关闭界面后，对数据进行重新整理；目前数据仅储存在data中，下一步改为json文件，模拟跨域的操作
