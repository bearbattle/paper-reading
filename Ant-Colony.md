# 论文信息

- 标题：Ant Colony based Online Learning Algorithm for Service Function Chain Deployment
- 时间：2023
- 会议：INFOCOM
- 算法名称：ACO-OSD, PLRP
- 作者：Yingling Mao, Xiaojun Shang, and Yuanyuan Yang
- 实验环境：
- 数据集：

# 一、问题场景

注意空间拓朴、业务模式、系统时间动态性等，明确描述所要解决的问题

商业服务器：
- 多个服务器之间有直接连接
- 每个服务器有多种计算资源，如 CPU 、 RAM 等
- 服务器之间连接的路由器有最大传输速率上限
- 服务器要么开着，要么关着，消耗资源的多少不影响其开启时的基础开销
- 当服务器上没有运行的服务时，服务器会关闭，被调度到关闭服务器上的服务会带来启动开销

SFC:
- SFC 会超时；
- SFC 由 VNF 构成，两个接续的 VNF 之间有数据流

问题：
如何将 SFC 部署到多个服务器上并满足：
- 服务部署开销较小；
- 服务延迟较小。

# 二、研究对象

其他与本文相关的工作大多没有考虑到多资源种类、排队时延、在线服务请求、超时机制。在向已经存在的调度策略引入这些变量时，大多数模型都会崩坏。

文章通过从元启发式算法入手，通过流行的 Ant Conlony Optimization 算法结合模型来解决问题。

# 三、数学模型

是一个什么数学问题，工程问题与数学问题之间的映射关系，有什么难点，采用了什么数学工具求解，有什么性能保证/理论结果/理论深度

服务器网络是 $G=(V,E)$ 的有向图；

$V=\{V_1, V_2, \cdots, V_M\}$ 表示服务器；

如果 $(V_p, V_q) \in E$ 就表示这两台服务器之间有直接的物理连接，这条连接的带宽和延时用 $B_{p,q}, l_{p,q}$ 分别表示。反之就是表示两台服务器之间没有直接连接。

$R_k^{CPU}$ 和 $R_k^{RAM}$ 标记了每个服务器 $V_k$ 的相关资源总量。

对于 $V_k$ 来说，服务器有开和关两种状态， $s_k(t)=1$ 时标志 $V_k$ 开机。

对 SFC 的建模：

在一段时间 $T$ 内共有 $m$ 个服务请求，每个服务请求需要一个 SFC 实现。在一个时隙中，服务器进行如下操作：

1. 删除超时的 SFC ；
2. 更新网络状态；
3. 收取到达的服务请求；
4. 决策 SFC 如何部署；
5. 更新网络状态。

$e_i(t)$ 表示在时隙 $t$ 时第 i 个 NFC 是否仍然未超时，也就是说：

$$
e_i(t) \Leftrightarrow t_i^s \leq t \leq t_i^s + t_i^l
$$

决策变量：

$x^k_{i,j}$ 是一个二值变量，只有第 $i$ 个服务请求的第 $j$ 个子函数 $F_{i,j}$ 部署到 $V_k$ 上时该值才会等于 1 。

资源约束：

$$
\sum_{i=1}^m\sum_{j=1}^{n_i} x^k_{i,j} \cdot f^X_{i,j} \cdot e_i(t) \leq R_k^X,
\forall 1\leq k \leq M, t \in T
$$

VNF 不能分割：

$$
\sum_{k=1}^M x^k_{i,j} = 1,
 \forall 1 \leq i \leq m, 1 \leq j \leq n_i
$$

VNF 的部署情况与服务器开启状态对应：

$$
s_k(t) = \begin{cases}
    1, \sum_{i=1}^m\sum_{j=1}^{n_i} x^k_{i,j} \cdot e_i(t) > 0, \\
    0, \sum_{i=1}^m\sum_{j=1}^{n_i} x^k_{i,j} \cdot e_i(t) = 0.
\end{cases}
$$

数据流路由：

$w_{i,j}^{p,q} = 1$ 等价于 $F_{i,j}$ 和 $F_{i,j+1}$ 之间的数据流经过了链路 $(v_p, V_q)$

由流量守恒，

$$
\sum_{p=1}^M w_{i,j}^{p,k} - \sum_{q=1}^M w_{i,j}^{k,q} = x^k_{i,j+1} - x^k_{i,j}
$$

带宽约束：

$$
\sum_{i=1}^m\sum_{j=1}^{n_i-1} (w_{i,j}^{p,q}+w_{i,j}^{q,p}) \cdot \lambda_i \cdot e_i(t) \leq B_{p,q}
$$

时延建模：

总体时延包括排队时延和传输时延，排队使用的是经典的 M/M/1 模型，平均排队时延为：

$$
l'_k(t) = \left(
    \mu_k-\sum_{i=1}^m
        \left(
            x_{i,1}^k+
            \sum_{j=1}^{n_i-1}
            \sum_{p=1}^{M}
            w_{i,j}^{p,k}
        \right)
        \cdot \lambda_i \cdot e_i(t)
    \right)^{-1}
$$

路由器容量约束：

$$
\sum_{i=1}^m
\left(
    x_{i,1}^k+
    \sum_{j=1}^{n_i-1}
    \sum_{p=1}^{M}
    w_{i,j}^{p,k}
\right)
\cdot \lambda_i \cdot e_i(t)
< \mu_k
$$

总体启动开销：

$$
\mathbb{C} = \sum_{t\in T} \sum_{k=1}^M C_k \cdot s_k(t)
$$

总体延迟：

$$
\mathbb{L} = \mathbb{D}_t + \mathbb{D}_q \\
\mathbb{D}_t = \sum_{t\in T} \sum_{i=1}^m \sum_{j=1}^{n_i-1} \sum_{p=1}^M \sum_{q=1}^M l_{p,q} \cdot w_{i,j}^{p,q} \cdot e_i(t) \\
\mathbb{D}_q = \sum_{t\in T} \sum_{i=1}^m
\left(
    x_{i,1}^k+
    \sum_{j=1}^{n_i-1}
    \sum_{p=1}^{M}
    w_{i,j}^{p,k}
\right)
\cdot e_i(t) \cdot l'_k(t)
$$

目标函数：

$$
\min \mathbb{W} = \alpha \cdot \mathbb{C} + \beta \cdot (\mathbb{D}_t + \mathbb{D}_p)
$$

# 四、算法设计

与数学模型的关系，如何实现了创新思路

使用蚁群算法。

# 五、实验结果

实验设置（重点观察了那些变量对结果的影响），如何体现优势的，是否与创新思路形成了闭环？有什么指导性建议？有何结论（结果和结论的关系密切吗？客观吗？）

## 1、比其他工作的优势

## 2、有优势的原因

## 3、改进空间

# 六、启发与思考

三条优点，学到了什么（可以关于调研、创新思路、处理技巧、论文写作、逻辑等等）

套到自己关心的问题中，有什么值得借鉴的吗？论文的方法，适用性上有何局限？

