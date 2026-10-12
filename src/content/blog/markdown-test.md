---
title: Markdown 渲染测试（草稿，不会发布）
date: 2026-10-12
description: 检查 Obsidian 常用语法在网站上的显示效果。
tags: [meta]
lang: zh
draft: true
---

这篇是排版测试，`draft: true`，只在本地 `npm run dev` 时可见，不会出现在线上。

## 公式

行内公式 $s(x) = 1 - \cos(f_x, t_{\text{normal}})$，块级公式：

$$
\mathrm{AUROC} = \int_0^1 \mathrm{TPR}\big(\mathrm{FPR}^{-1}(u)\big)\,du
$$

## 代码

```python
import torch

def anomaly_map(patch_feats: torch.Tensor, text_feats: torch.Tensor) -> torch.Tensor:
    patch_feats = patch_feats / patch_feats.norm(dim=-1, keepdim=True)
    text_feats = text_feats / text_feats.norm(dim=-1, keepdim=True)
    return (patch_feats @ text_feats.T).softmax(dim=-1)[..., 1]
```

## Obsidian callout

> [!note] 核心理解
> callout 会被渲染成带色条的提示框。

> [!warning]
> 没有标题时显示类型名。

## 表格

| 设置 | 指标 | 值 |
|---|---|---|
| 示例 | 示例 | 示例 |

## 列表

1. 第一步
2. 第二步
   - 嵌套项
