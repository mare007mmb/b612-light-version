export const audits = [
  { num: '011', title: 'Hyperlane', sub: 'Permissionless interchain messaging — v3 ISMs', scope: 'Solidity · 14kLOC', date: 'May 2026', findings: { high: 2, med: 4, low: 7 }, crit: 0 },
  { num: '010', title: 'Wormhole · Native Token Transfers', sub: 'Cross-chain token standard, 7 EVM chains', scope: 'Solidity · 9kLOC', date: 'Apr 2026', findings: { high: 1, med: 6, low: 9 }, crit: 1 },
  { num: '009', title: 'IBC light-client', sub: 'Tendermint LC for Polkadot parachain', scope: 'Rust · 22kLOC', date: 'Feb 2026', findings: { high: 3, med: 8, low: 12 }, crit: 0 },
  { num: '008', title: 'Across Protocol', sub: 'Optimistic bridge — relayer fee logic & UMA assertions', scope: 'Solidity · 6kLOC', date: 'Jan 2026', findings: { high: 1, med: 3, low: 5 }, crit: 0 },
  { num: '007', title: 'Skip Protocol', sub: 'Block-builder MEV pipeline · CometBFT integration', scope: 'Go · 18kLOC', date: 'Dec 2025', findings: { high: 0, med: 5, low: 11 }, crit: 0 },
  { num: '006', title: 'Eigenlayer · AVS Slasher', sub: 'Restaking slasher contracts and oracle adapter', scope: 'Solidity · 4kLOC', date: 'Oct 2025', findings: { high: 2, med: 7, low: 8 }, crit: 1 },
  { num: '005', title: 'Connext · xCall', sub: 'Cross-chain call standard — pre-mainnet review', scope: 'Solidity · 11kLOC', date: 'Aug 2025', findings: { high: 1, med: 4, low: 6 }, crit: 0 },
  { num: '004', title: 'Celestia · Blobstream', sub: 'Data-availability bridge to Ethereum', scope: 'Solidity + Go', date: 'Jun 2025', findings: { high: 2, med: 5, low: 8 }, crit: 0 },
  { num: '003', title: 'Stride · Liquid Staking', sub: 'Multi-chain LST issuance + redemption', scope: 'Go · CosmWasm', date: 'Apr 2025', findings: { high: 1, med: 3, low: 10 }, crit: 0 },
  { num: '002', title: 'Hop Protocol', sub: 'AMM bonder mechanics + L2 messengers', scope: 'Solidity · 8kLOC', date: 'Feb 2025', findings: { high: 0, med: 4, low: 6 }, crit: 0 },
  { num: '001', title: 'Confidential · A1', sub: 'Cross-chain DEX — NDA', scope: 'Solidity · 19kLOC', date: 'Nov 2024', findings: { high: 3, med: 9, low: 14 }, crit: 2 },
];

export const bountyFindings = [
  { id: 'BB-001', sev: 'Critical', sevClass: 'crit', protocol: 'Wormhole', program: 'Immunefi', date: 'Mar 2026', reward: '$150,000', title: 'Unchecked signature replay on VAA processing', dek: 'A missing chain-ID check in the VAA verification path allowed a signed message from Ethereum to be replayed on BNB Chain before guardian set rotation. Full bridge drain possible on any newly deployed chain.' },
  { id: 'BB-002', sev: 'Critical', sevClass: 'crit', protocol: 'Arbitrum', program: 'Immunefi', date: 'Jan 2026', reward: '$100,000', title: 'L1→L2 alias bypass via CREATE2 collision', dek: 'An attacker could pre-deploy a contract at the aliased address of a privileged L1 account before it was created, gaining temporary ownership of any ETH forwarded from L1 administrative calls.' },
  { id: 'BB-003', sev: 'High', sevClass: 'high', protocol: 'Eigenlayer', program: 'Eigenlayer Program', date: 'Nov 2025', reward: '$35,000', title: 'Slasher double-spend via queued withdrawal race', dek: 'A staker could simultaneously queue a withdrawal and trigger a slashing event in the same block. Due to ordering assumptions in the slasher, the withdrawal completed without penalty if sequenced before the slash callback settled.' },
  { id: 'BB-004', sev: 'High', sevClass: 'high', protocol: 'Uniswap v4', program: 'Uniswap Foundation', date: 'Sep 2025', reward: '$20,000', title: 'Hook return value not validated — pool state corruption', dek: 'The PoolManager did not validate the return selector from beforeSwap hooks, allowing a malicious or misconfigured hook to corrupt pool sqrt price state silently and cause downstream liquidity calculations to underflow.' },
  { id: 'BB-005', sev: 'High', sevClass: 'high', protocol: 'Hop Protocol', program: 'Immunefi', date: 'Jul 2025', reward: '$12,500', title: 'Bonder front-run on challenge window close', dek: 'The challenge window check used block.number, not block.timestamp, creating a ~2 block window on networks with variable block times where a bonder could front-run a valid challenge with a no-op settlement transaction.' },
  { id: 'BB-006', sev: 'Medium', sevClass: 'med', protocol: 'Across Protocol', program: 'Immunefi', date: 'May 2025', reward: '$5,000', title: 'Incorrect fee decimals in multi-hop relay', dek: 'Fee scaling assumed 18-decimal tokens across all supported chains. USDC (6 decimals) on Polygon caused relay fees to be computed at 10^12× the intended value, making multi-hop relays economically unviable.' },
];

export const episodes = [
  { num: 'Ep. 24 · Latest', tag: 'Bridge Security', title: 'On bridge invariants and the price of optimism', guest: 'Tarun Chitra · Gauntlet', dur: '1:08:32' },
  { num: 'Ep. 23', tag: 'Restaking', title: 'Restaking economics and the new attack surface', guest: 'Mike Silagadze · EigenLayer', dur: '54:18' },
  { num: 'Ep. 22', tag: 'Cross-chain', title: 'How Wormhole thinks about guardian security', guest: 'Hendrik Hofstadt · Wormhole Foundation', dur: '1:14:07' },
  { num: 'Ep. 21', tag: 'MEV', title: 'Block building, MEV, and what validators actually see', guest: 'Alex Obadia · Flashbots', dur: '48:44' },
  { num: 'Ep. 20', tag: 'Auditing', title: 'Why most audit reports miss the point', guest: 'samczsun · Paradigm', dur: '1:02:55' },
];

export const caseCases = [
  { id: 'B612 · Case 01', sev: 'Critical', sevClass: 'crit', date: 'Oct 2025 · Confidential', title: 'Unchecked return value enables silent token theft in ERC-4626 vault', dek: 'A yield-bearing vault used a custom transfer hook that returned false on failure instead of reverting. The deposit logic did not check the return value, allowing an attacker to deposit without transferring underlying tokens and immediately redeem shares for real assets.', tags: ['DeFi · Vault', '11,200 LOC'] },
  { id: 'B612 · Case 02', sev: 'Critical', sevClass: 'crit', date: 'Aug 2025 · Public', title: 'Cross-chain reentrancy via callback-before-state-update pattern', dek: 'A bridge adapter triggered an external callback to the receiving contract before marking the message as processed. An attacker could re-enter the bridge mid-flight using a second pending message and drain the relayer\'s gas escrow, permanently halting the bridge on that domain.', tags: ['Bridge · Interop', '8,400 LOC'] },
  { id: 'B612 · Case 03', sev: 'High', sevClass: 'high', date: 'Jun 2025 · Confidential', title: 'Governance proposal bypass via flash-loan quorum manipulation', dek: 'The governance contract snapshot voting power at proposal creation time using the current block, not a historical checkpoint. An attacker could flash-borrow governance tokens, create a proposal, vote in the same transaction, and repay — passing proposals with no lasting economic stake.', tags: ['Governance · DAO', '5,800 LOC'] },
  { id: 'B612 · Case 05', sev: 'High', sevClass: 'high', date: 'Mar 2025 · Public', title: 'Liquidity oracle manipulation via single-block TWAP window', dek: 'A lending protocol used a 1-block TWAP window to price collateral. On a low-liquidity pool, a single large swap in the same block as a borrow could move the oracle enough to allow undercollateralised loans, with the swap reversed in the next block at no net cost.', tags: ['Lending · Oracle', '14,600 LOC'] },
  { id: 'B612 · Case 06', sev: 'Medium', sevClass: 'med', date: 'Jan 2025 · Public', title: 'Unbounded loop in batch redemption causes permanent DoS', dek: 'A restaking contract processed redemption requests in a single unbounded loop. An attacker could queue thousands of 1-wei redemption requests at negligible cost, causing every subsequent batch redemption to exceed the block gas limit and permanently brick the withdrawal queue.', tags: ['Restaking · LST', '7,100 LOC'] },
];

export const logos = [
  { src: '/logos/layer-zero.png', alt: 'LayerZero', href: 'https://layerzero.network/' },
  { src: '/logos/tapioca.png', alt: 'Tapioca', href: 'https://www.tapioca.xyz/' },
  { src: '/logos/corn.png', alt: 'Corn', href: 'https://usecorn.com/' },
  { src: '/logos/flexy.png', alt: 'Flexy', href: 'https://flexy.finance/' },
  { src: '/logos/prophet-bots.png', alt: 'Prophet Bots', href: 'https://prophets.bot/' },
  { src: '/logos/sonar.png', alt: 'Sonar', href: 'https://sonar.watch/', square: true },
];

export const teamMembers = [
  { role: 'Founder & Lead Researcher', name: 'Lead Researcher', meta: '8+ years web3 security · 40+ audits', specs: ['Solidity', 'Rust', 'Go', 'Cross-chain'] },
  { role: 'Senior Security Researcher', name: 'Senior Researcher', meta: 'Specialist in DeFi and lending protocols', specs: ['Solidity', 'EVM', 'DeFi'] },
  { role: 'Security Researcher', name: 'Researcher II', meta: 'Cosmos / IBC and Move ecosystems', specs: ['CosmWasm', 'Move', 'IBC'] },
  { role: 'Security Researcher', name: 'Researcher III', meta: 'EVM internals and ZK circuit auditing', specs: ['EVM', 'ZK', 'Circom'] },
];
