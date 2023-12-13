# 论文阅读清单与读书笔记

2023/11/27

## 读书清单

| 序号 | 标题                                                         | 主题         | 原因                                                         |
| ---- | ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ |
| 1    | [Performance-Effective and Low-Complexity Task Scheduling for Heterogeneous Computing](./Performance-Effective.md) | [调度算法]() | 虽然是早期的工作，但是相对而言其建模思想和数学模型都比较完备，值得作为 DAG 任务调度入门的参考资料。 |
| 2    | [Ant Colony based Online Learning Algorithm for Service Function Chain Deployment](./Ant-Conloly.md) | [调度算法]() | 近期工作。顶会。SFC 与研究的依赖型任务有一定的相似性。       |
| 3    | Adaptive Resource Efficient Microservice Deployment in Cloud-Edge Continuum | [调度算法]() | 顶刊。在边云场景下考虑了微服务的优化部署问题。考虑了通信开销、资源争用、服务质量。 |
| 4    | Fast Adaptive Task Offloading in Edge Computing Based on Meta Reinforcement Learning | [调度算法]() | 顶刊。基于元强化学习的任务卸载方法。                         |
| 5    | GMA: Graph Multi-agent Microservice Autoscaling Algorithm in Edge-Cloud Environment | [调度算法]() | 软信息同步、自治和协作。基于信息推断的服务器协作。基于图卷积网络和多代理强化学习的 SAC 范式的实现。 |
| 6    | Online Container Scheduling for Data-intensive Applications in Serverless Edge Computing | [调度算法]() | 近期工作。顶会。基于容器的调度问题在线算法，由理论证明其全局最优解的保证。 |
| 7    | The HPC-DAG Task Model for Heterogeneous Real-Time Systems   | [调度算法]() | 顶刊。适用于嵌入式实时系统的DAG。针对特殊场景对 DAG 图就够进行了优化，引入了异构并行条件。 |
| 8    | TDTA: Topology-Based Real-Time DAG Task Allocation on Identical Multiprocessor Platforms | [调度算法]() | 近期工作。顶刊。适用于多核平台的多DAG 任务调度算法。强大的数学证明。 |
| 9    | Intra-Task Priority Assignment in Real-Time Scheduling of DAG Tasks On Multi-Cores | [调度算法]() | 顶刊。说明了DAG图中控制顶点级优先级分配的执行顺序对执行结果的影响。大量数学证明，没太看懂。 |
| 10   | Towards Efficient Processing of Latency-Sensitive Serverless DAGs at the Edge | [系统架构]() | 针对边缘场景下的 Serverless 计算架构进行了设计，提出了基于 WASM 的相关实现。对调度算法没有体现。 |
| 11   | A Decentralized Framework for Serverless Edge Computing in the Internet of Things | [系统架构]() | 针对边缘场景下的 Serverless 计算架构进行了设计。做了高效的分发算法。 |
| 12   | Hermes: Latency Optimal Task Assignment for Resource-constrained Mobile Computing | [调度算法]() | 全多项式时间近似方案（FPTAS）--Hermes。作者以串行树作为任务的形式讨论了复杂任务的执行。 |
| 13   | Improving Interference Analysis for Real-Time DAG Tasks Under Partitioned Scheduling | [调度算法]() | TDTA 的前置工作。提出了减少重复计算（RRC）的方法来优化嵌入式系统的 DAG 任务调度。 |
| 14   | Multihop Offloading of Multiple DAG Tasks in Collaborative Edge Computing | [调度算法]() | 在多跳网络中对依赖型任务进行部署。考虑了多个依赖型任务和网络数据流的任务调度。JDOFH |

