/* OCR H573 — Essay plans and sample answers.
   For each major topic: thesis line, paragraph-by-paragraph plan with key scholars,
   counter-arguments, and conclusion guidance. */
const ESSAY_PLANS = [
  {
    id: "ontological-attributes",
    paper: "01",
    question: "'It is impossible to argue for the existence of God from his attributes.' Discuss. [40]",
    topic: "Arguments from Reason",
    thesis: "We cannot derive God's existence from his definition because (a) the predicate 'existence' is contested, (b) the subject 'God' is not fully knowable, and (c) doing so would collapse the 'epistemological space' (Hick) on which meaningful faith depends.",
    paragraphs: [
      {
        topic: "The ontological argument's a priori structure",
        scholars: ["Anselm: Proslogion 2 ('that than which nothing greater can be conceived')", "Anselm: Proslogion 3 (necessary existence)"],
        argument: "Anselm argues God is de dicto necessary — necessary through language. To deny God's existence is contradictory because existence in reality is greater than existence in the mind alone.",
        counter: "Gaunilo: by the same logic, the most perfect island must exist. Reductio.",
        response: "Anselm replies the argument applies only to God: an island is contingent by definition (dynamic landform, exists over millions of years), so the parody fails. Descartes supports: necessary existence belongs to God's essence."
      },
      {
        topic: "Kant's critique: existence is not a predicate",
        scholars: ["Kant", "Descartes (the target of Kant)", "Frege & Russell (modern formulation)"],
        argument: "Kant rejects Descartes' formulation that a supremely perfect being must have the perfection of existence. Existence adds nothing to the concept — a hundred real thalers are no richer than a hundred imagined.",
        counter: "Norman Malcolm / Plantinga: necessary existence (Proslogion 3) IS a predicate; Kant's objection misses the modal version.",
        response: "Even the modal argument's premise ('a necessary being is possible') is what the atheist denies; question-begging in practice."
      },
      {
        topic: "The epistemological space",
        scholars: ["John Hick: epistemological distance/space", "1 Corinthians 13 ('through a glass, darkly')", "D.Z. Phillips"],
        argument: "If God's existence could be derived from his definition, faith would be redundant — we would have no choice but to believe. Hick: God leaves an 'epistemological space' for genuine relationship through faith.",
        counter: "Some theologians argue we can know God through revelation without compromising faith.",
        response: "Self-limitation of God's attributes preserves faith; arguing from attributes destroys what makes the relationship meaningful."
      }
    ],
    conclusion: "We cannot derive God's existence from his definition. The problematic logic, the contested nature of 'existence' as predicate, and the destruction of epistemological space all converge on the verdict. D.Z. Phillips' deeper point: it may not even make sense to argue for God's existence — theology takes God as its starting axiom, as mathematics takes its.",
    examMarks: "AO1 L6 (14/16) + AO2 L5 (21/24) = 35/40 (Grade A)",
    examinerNotes: "Strong opening thesis. Good engagement with Gaunilo and Kant. Loses AO2 L6 by not unpacking 'attributes' and 'predicate' fully enough. Concluding paragraph slightly weak — needs to return more sharply to the question."
  },
  {
    id: "anselm-justifies-belief",
    paper: "01",
    question: "'Anselm's Ontological Argument justifies a belief in God.' Discuss. [40]",
    topic: "Arguments from Reason",
    thesis: "Anselm's ontological argument fails to justify a belief in God. While Gaunilo's parody fails, Kant's objection that existence is not a predicate is decisive, and Hick's distinction between logical and ontological necessity finishes the job.",
    paragraphs: [
      {
        topic: "Strengths of Anselm's approach",
        scholars: ["Anselm: Proslogion 2 and 3", "Psalm 14:1 ('the fool says in his heart there is no God')", "Plato (rationalist epistemology)"],
        argument: "Anselm uses pure a priori reasoning: God is 'that than which nothing greater can be conceived'. Existence in reality is greater than existence in the mind. Therefore God exists in reality. Proslogion 3 strengthens: God's non-existence is inconceivable.",
        counter: "Empiricists reject a priori reasoning about existence.",
        response: "Plato supports: knowledge comes through reason, not the senses, so a priori reasoning about ultimate reality is legitimate."
      },
      {
        topic: "Gaunilo's lost island fails",
        scholars: ["Gaunilo (perfect island)", "Anselm's reply", "Descartes (essence and existence)", "Plantinga (intrinsic maximum)"],
        argument: "Gaunilo: by Anselm's logic, the most perfect island must exist. Reductio.",
        counter: "Anselm: applies only to God. Descartes: God's essence includes necessary existence; islands' don't.",
        response: "An island is contingent by definition — its existence depends on water surrounding it. So Gaunilo commits a straw man. Plantinga: greatness admits an intrinsic maximum only for God."
      },
      {
        topic: "Kant's critique succeeds where Gaunilo fails",
        scholars: ["Kant", "Malcolm (defence of necessary existence)", "Hick (logical vs ontological necessity)"],
        argument: "Kant: a triangle necessarily has three sides only IF it exists. Similarly, God necessarily exists only if God actually exists. So denying God's necessity is only contradictory if God exists.",
        counter: "Malcolm: Kant misses that a necessary being must exist by definition.",
        response: "Hick: Malcolm confuses logical and ontological necessity. Calling God non-contingent only means God would be self-explaining IF he were real — not that he must be real. Anselm cannot establish the incoherence of God's non-existence."
      }
    ],
    conclusion: "Anselm's ontological argument does not justify belief in God. While Gaunilo fails to disprove it, Kant's rebuttal that necessity does not imply existence is effective, making the argument illogical and ultimately unjustified.",
    examMarks: "AO1 L6 (16/16) + AO2 L5 (20/24) = 36/40 (Grade A)"
  },
  {
    id: "cosmological-jumps",
    paper: "01",
    question: "'The cosmological argument simply jumps to the conclusion of a transcendent creator.' Discuss. [40]",
    topic: "Arguments from Observation",
    thesis: "The cosmological argument does jump beyond what its premises strictly support — it cannot establish the personal, loving God of Christianity — but the leap is reasonable, not arbitrary, because the alternative (brute fact universe) is no more parsimonious than necessary being.",
    paragraphs: [
      {
        topic: "Aquinas' first three Ways",
        scholars: ["Aquinas (motion, causation, contingency)", "Principle of Sufficient Reason"],
        argument: "Motion needs a mover; causation needs a cause; contingency needs a necessary being. Infinite regress is impossible. Therefore a First Mover / Uncaused Cause / Necessary Being exists.",
        counter: "Why must contingency have a non-contingent ground? Why is infinite regress impossible?",
        response: "PSR is a metaphysical presupposition all genuine explanation requires."
      },
      {
        topic: "Hume and Russell's critiques",
        scholars: ["Hume (no experience of universe-creation)", "Russell ('the universe is just there, and that's all')", "Copleston (Russell debate, 1948)"],
        argument: "Hume: we cannot reason analogically from human causation to cosmic causation. Russell: the universe needs no explanation; it is a brute fact.",
        counter: "But 'brute fact' is no less arbitrary than 'necessary being'.",
        response: "Russell's move is symmetrically available to the theist (God simply exists necessarily). The argument therefore does not jump to a creator — it establishes that the universe requires either a necessary being or a stop-explanation that is itself unexplained."
      },
      {
        topic: "The jump from First Cause to God",
        scholars: ["Hume (limited / multiple / dead designer possibilities)"],
        argument: "Even granted a First Cause, the argument cannot establish that this Cause is personal, loving, or worthy of worship.",
        counter: "Aquinas combines the Five Ways: the same source must ground motion, causation, contingency, gradation, and teleology. That is a fairly specific being.",
        response: "Still does not yield the Christian God specifically; further argument needed."
      }
    ],
    conclusion: "The argument does jump beyond strict logical necessity — it cannot establish the omni-God of Christianity. But the jump is not arbitrary: contingency really does demand explanation, and 'brute fact' is no cheaper than 'necessary being'. The cosmological argument keeps theism rational; it does not prove it.",
  },
  {
    id: "evil-no-god",
    paper: "01",
    question: "'The existence of evil proves that there is no God.' Discuss. [40]",
    topic: "Problem of Evil",
    thesis: "Evil does not prove there is no God, but it makes the existence of the classical omni-God highly improbable; theodicies fail to neutralise the evidential weight of gratuitous suffering, so the honest theist concedes evil as mystery rather than solving it as puzzle.",
    paragraphs: [
      {
        topic: "The logical problem and Plantinga's response",
        scholars: ["Mackie (inconsistent triad)", "Plantinga (free-will defence)"],
        argument: "Mackie: omnipotence + omnibenevolence + evil cannot all be true. Plantinga: God could not create free creatures and guarantee they always choose good — the free-will defence resolves the logical contradiction.",
        counter: "What about natural evil? And free-will defence requires significant libertarian freedom.",
        response: "Plantinga's response succeeds against the logical problem; it does not answer the evidential one."
      },
      {
        topic: "Augustine and Hick's theodicies fail",
        scholars: ["Augustine (privatio boni, Fall)", "Schleiermacher", "Hick (soul-making)", "D.Z. Phillips"],
        argument: "Augustine's theodicy requires literal Fall (untenable post-evolution). Hick's soul-making cannot explain gratuitous suffering, especially of children and animals.",
        counter: "Hick: universalism — all souls eventually reach God; suffering builds character.",
        response: "But quantity and distribution of evil exceed any pedagogical need. D.Z. Phillips: offering this as soul-making tuition is morally monstrous."
      },
      {
        topic: "The evidential problem",
        scholars: ["Rowe (the fawn in the forest fire)", "Wykstra (CORNEA)", "Adams (horrendous evils)"],
        argument: "Rowe: gratuitous suffering (animal pain over hundreds of millions of years before humans, the Holocaust, childhood cancer) is not proportionate to any moral good we can name.",
        counter: "Wykstra: we may not be in a position to judge whether suffering is gratuitous; God could have reasons we cannot see.",
        response: "Sceptical theism saves theodicy but at the cost of paralysing all moral judgement about what God is doing — too expensive."
      }
    ],
    conclusion: "Evil does not deductively prove there is no God — Plantinga answers the logical problem. But the evidential problem stands: gratuitous suffering is rationally inconsistent with the omni-God. The honest theist follows Job — refuses the theodicies, holds the faith, accepts the problem as mystery."
  },
  {
    id: "natural-law-reliable",
    paper: "02",
    question: "'Natural law provides a reliable method of moral decision-making.' Discuss. [40]",
    topic: "Natural Law",
    thesis: "Natural law succeeds as an internal Catholic ethic but fails as the universal rational method it claims to be. Aquinas' teleological premise cannot survive modern biology, and Finnis' reconstruction abandons the naturalism that gave natural law its name.",
    paragraphs: [
      {
        topic: "Aquinas' system",
        scholars: ["Aquinas (telos, four tiers, primary precepts)", "Aristotle"],
        argument: "Human telos is union with God. Five primary precepts (preservation of life, ordered society, worship, education, reproduction) generate secondary precepts by reason. Double effect refines absolutism.",
        counter: "How do we know human nature has a telos?",
        response: "Aquinas: practical reason recognises basic goods. The system is internally coherent for a Catholic worldview."
      },
      {
        topic: "Modern biology undermines telos",
        scholars: ["Nietzsche (theological residue)", "Darwin", "Finnis (new natural law)"],
        argument: "Evolution selects for reproductive fitness, not flourishing. There is no metaphysical purpose to human nature.",
        counter: "Finnis grounds basic goods in self-evident practical reason rather than nature.",
        response: "But this abandons naturalism — natural law becomes rationalist intuitionism, less 'natural' and more invented."
      },
      {
        topic: "Naturalistic fallacy and rigidity",
        scholars: ["Hume (is/ought gap)", "Moore (naturalistic fallacy)", "Fletcher (situation ethics critique)"],
        argument: "Hume: you cannot derive 'ought' from 'is'. Moore: 'good' is not identical to any natural property. Natural law moves from biological function to moral claim illegitimately.",
        counter: "Aquinas argues from telos to practical reason, not directly from nature to ought.",
        response: "But the telos itself is a normative claim about nature, so the gap reappears at one remove."
      }
    ],
    conclusion: "Natural law is reliable within the Catholic tradition that grants its premises; it is not reliable as the universal rational method it claims to be. Finnis' rescue concedes the original objection by abandoning naturalism. As a Catholic system it endures; as universal ethics it has lost its foundations."
  },
  {
    id: "utilitarianism-best",
    paper: "02",
    question: "'Utilitarianism is the best approach to moral decision-making.' Discuss. [40]",
    topic: "Utilitarianism",
    thesis: "Utilitarianism is indispensable for public policy but indefensible as a complete moral theory; it tracks aggregate welfare brilliantly and individual rights disastrously. The right architecture is utility within Kantian constraints, not utility alone.",
    paragraphs: [
      {
        topic: "Strengths: impartiality and policy fit",
        scholars: ["Bentham (hedonic calculus)", "Mill (qualitative)", "Singer (preference)"],
        argument: "Treats everyone equally. Translates moral question into measurable consequences. Foundation of public policy, triage, cost-benefit analysis. Mill's higher pleasures answer the 'doctrine fit for swine' objection.",
        counter: "How do you measure happiness? Calculation is impossible.",
        response: "Rough calculation is still better than no calculation in policy contexts."
      },
      {
        topic: "The justice problem is fatal",
        scholars: ["Williams (sheriff case)", "McCloskey (organ harvest)", "Rawls"],
        argument: "Williams' sheriff: framing one innocent prevents a riot — utility positive, clearly wrong. Five patients need organs; harvest one visitor for net utility. These show utilitarianism cannot protect individuals against collective gain.",
        counter: "Rule utilitarianism: follow rules whose general observance maximises utility.",
        response: "But if a rule is justified by utility, why not break it when breaking serves utility? Rule utilitarianism collapses into act, or stops being utilitarian."
      },
      {
        topic: "Demandingness and distribution",
        scholars: ["Singer (famine relief)"],
        argument: "Singer's logic: give until marginal disutility to you equals marginal utility to recipient. This is monstrously demanding.",
        counter: "Either morality is that demanding, or utilitarianism is wrong.",
        response: "Utilitarianism is also indifferent to distribution — 100 units of pleasure for one equals 10 for ten — which ignores the moral weight of fairness."
      }
    ],
    conclusion: "Utilitarianism is the best approach for *public policy* and the worst for *individual rights*. The right verdict is structural: utility within Kantian constraints, not utility as master. As a complete moral theory it is false; as a tool within an ethic of rights, it is indispensable."
  },
  {
    id: "freud-conscience",
    paper: "02",
    question: "'Freud's account of conscience is more convincing than Aquinas'.' Discuss. [40]",
    topic: "Conscience",
    thesis: "Neither account is adequate alone. Aquinas correctly identifies moral reasoning as real but wrongly locates it in a single divine faculty; Freud correctly identifies upbringing as shaping moral emotion but wrongly reduces conscience to the super-ego.",
    paragraphs: [
      {
        topic: "Aquinas: conscience as reason",
        scholars: ["Aquinas (ratio, synderesis, conscientia)", "vincible/invincible ignorance"],
        argument: "Synderesis is innate disposition to good (infallible); conscientia is its application (fallible). Conscience errs through lack of knowledge, not lack of goodness. Vincible ignorance is culpable; invincible is not.",
        counter: "If synderesis is universal and infallible, why moral disagreement?",
        response: "Disagreement is at the level of conscientia (application). Synderesis itself is the bare principle 'do good, avoid evil'."
      },
      {
        topic: "Freud: conscience as super-ego",
        scholars: ["Freud (id, ego, super-ego)", "Fromm (authoritarian vs humanistic conscience)"],
        argument: "The super-ego is internalised parental and social prohibitions. What religion calls 'the voice of God' is the internalised father. Guilt is neurotic, often disproportionate to actual moral failure.",
        counter: "Freud's account is reductive — sweeping all moral experience into psychology.",
        response: "Empirical evidence supports super-ego mechanism, especially in excessive religious guilt and OCD-spectrum scrupulosity."
      },
      {
        topic: "Modern moral psychology",
        scholars: ["Haidt", "Kohlberg", "Gilligan"],
        argument: "Conscience is plural: cognitive reasoning + moral emotion + social learning + identity. Haidt: moral intuition precedes rationalisation. Neither Aquinas' single faculty nor Freud's single mechanism captures this.",
        counter: "But this dilutes 'conscience' into many things.",
        response: "That dilution may be the truth. Both Aquinas and Freud were partly right and partly wrong; conscience is composite."
      }
    ],
    conclusion: "Freud is not more convincing than Aquinas; both capture part of conscience and miss other parts. Aquinas' synderesis survives as the human capacity for moral reasoning; Freud's super-ego survives as one mechanism of internalised moral emotion. Conscience is plural — neither giant has the whole picture."
  },
  {
    id: "augustine-pessimistic",
    paper: "03",
    question: "'Augustine's view of human nature is too pessimistic.' Discuss. [40]",
    topic: "Augustine on Human Nature",
    thesis: "Augustine's theology is biologically false and morally troubling in its details, but psychologically profound; demythologised, it survives as insight into the curvature of the will, not as doctrine.",
    paragraphs: [
      {
        topic: "Augustine's account",
        scholars: ["Augustine (Confessions, City of God)", "Romans 5:12", "Psalm 51:5"],
        argument: "Adam's Fall transmitted original sin biologically. All humans inherit disordered will (incurvatus in se), concupiscence, and mortality. Salvation requires grace; humans cannot save themselves. Some are elected; others justly damned.",
        counter: "Pelagius: humans have genuine free will and can choose good without grace.",
        response: "Augustine: Pelagius underestimates the depth of fallen will (Romans 7: 'I do not do the good I want')."
      },
      {
        topic: "Biological and moral problems",
        scholars: ["Modern evolutionary biology", "Schleiermacher", "Rahner"],
        argument: "Literal Fall and single human pair are scientifically untenable. Biological transmission of guilt through sex is morally obscene. Schleiermacher: a perfect creation cannot produce corruption without already containing the flaw.",
        counter: "Catholic theology reinterprets the Fall as mythic encoding of universal human condition (Rahner, McGrath).",
        response: "But this changes Augustine's account substantially — keeps the insight, drops the mechanism."
      },
      {
        topic: "What survives demythologised",
        scholars: ["Niebuhr (Christian realism)", "Charles Taylor", "Aquinas (grace perfects nature)"],
        argument: "Augustine's diagnosis of the will (incurvatus in se) remains a powerful description of moral experience. Niebuhr: Augustinian realism without literal Fall — humans are not as bad as Augustine said, but the structure of bias toward self is real.",
        counter: "Aquinas softens: grace perfects nature; nature is wounded, not destroyed.",
        response: "Augustine is too pessimistic if taken literally; not too pessimistic if read as description of the universally observed pattern of moral failure."
      }
    ],
    conclusion: "Augustine is too pessimistic only if we take the literal Fall as his main claim; not too pessimistic if we take his analysis of the fallen will as what actually matters. The honest verdict: keep Augustine's insight, abandon his mechanism."
  },
  {
    id: "christianity-essentially-sexist",
    paper: "03",
    question: "'Christianity is essentially sexist.' Discuss. [40]",
    topic: "Gender & Theology",
    thesis: "Christianity is historically patriarchal but not essentially so. Daly's exit position proves too much (it would condemn every world religion); Ruether's reform position is borne out by the actual transformation of mainline Christianity over the last fifty years.",
    paragraphs: [
      {
        topic: "Daly's case",
        scholars: ["Daly ('if God is male, then the male is God')", "Trible (texts of terror)"],
        argument: "Male Father-God, male Son, male priesthood — Christianity sanctifies patriarchy at the level of structure, not accident. Witch-hunts, denial of ordination, biblical violence against women are symptomatic of the religion's core.",
        counter: "Other religions also use male language for God — Judaism, Islam.",
        response: "If Daly is right, all those religions are also unreformable. But she singles out Christianity."
      },
      {
        topic: "Ruether's reform position",
        scholars: ["Ruether (Sexism and God-Talk)", "Wisdom tradition (Proverbs 8, Sophia)", "Jesus' practice with women", "Elizabeth Johnson (She Who Is)"],
        argument: "Christianity contains prophetic resources against its own patriarchal deformations. Jesus consistently transgresses gender norms — speaks with Samaritan woman, accepts women disciples, first witnessed as risen by Mary Magdalene. Wisdom is feminine in biblical personification.",
        counter: "Institutional Christianity has been slow to embody these resources.",
        response: "But it is embodying them: women's ordination, inclusive liturgy, feminist biblical scholarship are facts of the last 50 years."
      },
      {
        topic: "The maleness of Christ",
        scholars: ["Gregory of Nazianzus ('what is not assumed is not redeemed')"],
        argument: "Catholic teaching: priest acts in persona Christi; therefore male. Critics: this confuses biological maleness with theological humanity. If Christ's maleness is salvifically necessary, his salvation of women is undermined.",
        counter: "Maleness is contingent; humanity is essential.",
        response: "Ruether's position is the only one that lets Christianity coherently say Christ saves women."
      }
    ],
    conclusion: "Christianity is not essentially sexist. Daly's exit proves too much; Ruether's reform is borne out by the visible transformation of Christian practice. What remains theologically essential is incarnation, redemption, and the imago Dei in male and female; what falls away is contingent cultural patriarchy."
  },
  {
    id: "marx-engagement",
    paper: "03",
    question: "'Christian theology should not engage with Marxist ideology.' Discuss. [40]",
    topic: "Liberation Theology and Marx",
    thesis: "Christian theology should engage with Marxist ideology in the same way Aquinas engaged with Aristotle: selectively, as a diagnostic tool rather than a master worldview. Liberation theology's vindication by Pope Francis confirms the engagement is fruitful.",
    paragraphs: [
      {
        topic: "Liberation theology's use of Marx",
        scholars: ["Gutiérrez (A Theology of Liberation)", "Boff (orthopraxis)", "Sobrino"],
        argument: "Marx's analysis of alienation and exploitation diagnoses Latin American poverty. Combined with biblical themes of liberation (Exodus, Magnificat, Luke 4), it produces structural sin and the preferential option for the poor.",
        counter: "Marxism is atheistic; using it imports atheism by stealth.",
        response: "The methodology (class analysis) is separable from the metaphysics (materialism). Aquinas used Aristotle's logic without his cosmology."
      },
      {
        topic: "Ratzinger's critique and Francis' rehabilitation",
        scholars: ["Joseph Ratzinger (1984 Instruction)", "Pope Francis (Evangelii Gaudium)"],
        argument: "The 1984 Vatican Instruction warned that liberation theology risked reducing Christianity to political ideology and romanticising class warfare. Genuine concern: where does Christ stand if everything is class struggle?",
        counter: "The 1986 follow-up recognised legitimate insights. Francis has rehabilitated liberation themes — the preferential option for the poor is now mainstream Catholic teaching.",
        response: "Engagement was tested and survived. Selectivity (sociology yes, full politics no) is the right calibration."
      },
      {
        topic: "Christianity's distinctive contribution",
        scholars: ["Romero (martyred 1980, canonised 2018)", "Cone (black liberation theology)"],
        argument: "Liberation theology's restraint on violence (unlike Marx) and its grounding of justice in imago Dei (unlike materialism) are theological achievements, not Marxist ones. The engagement made Christianity more itself, not less.",
        counter: "Critics: liberation theology blesses revolutionary violence (Camilo Torres).",
        response: "The mainstream tradition (Gutiérrez, Romero) rejected violence in favour of non-violent solidarity. The engagement was disciplined."
      }
    ],
    conclusion: "Christian theology should engage with Marxist ideology as it has always engaged with non-Christian thought — selectively, with discrimination, drawing on what illuminates and refusing what contradicts the gospel. Pope Francis' rehabilitation of liberation theology's themes confirms the verdict: the engagement was right."
  },
  {
    id: "religious-language-cognitive",
    paper: "01",
    question: "'Religious language is only meaningful if it is cognitive.' Discuss. [40]",
    topic: "Religious Language: 20th Century",
    thesis: "Religious language is most defensible as cognitive (Aquinas' analogical realism), but Wittgensteinian non-cognitivism saves religion at the cost of saying nothing the believer wants to say. The verification principle that motivated non-cognitivism is itself self-refuting.",
    paragraphs: [
      {
        topic: "The positivist challenge",
        scholars: ["Ayer (verification principle)", "Vienna Circle"],
        argument: "A statement is meaningful only if analytically true or empirically verifiable. Religious statements are neither — therefore meaningless.",
        counter: "The verification principle itself is neither analytic nor empirically verifiable; by its own standard, meaningless. Self-refuting.",
        response: "Weak verification (some observations count for or against) lets religious statements back in."
      },
      {
        topic: "Falsification: Flew, Hare, Mitchell",
        scholars: ["Flew (death by a thousand qualifications)", "Hare (bliks)", "Mitchell (the partisan)"],
        argument: "Flew: religious belief is unfalsifiable; nothing counts against it. Therefore says nothing.",
        counter: "Hare: bliks are unfalsifiable but meaningful frameworks. Mitchell: the partisan trusts a leader through ambiguous evidence — religious faith is qualified, not surrendered, by counter-evidence.",
        response: "Mitchell wins the exchange: sophisticated religious belief does treat evidence seriously without being defeated by it. The cognitive content survives."
      },
      {
        topic: "Wittgenstein's language games",
        scholars: ["Wittgenstein (meaning is use, forms of life)", "Phillips (non-cognitive religion)"],
        argument: "Religious language is a language game with its own grammar; criticising it by scientific standards is a category error.",
        counter: "But this makes religious claims non-cognitive — 'God exists' becomes a move in a religious life, not a claim about reality.",
        response: "That satisfies the philosopher but not the believer. Believers want 'God exists' to be true, not just to have a use."
      }
    ],
    conclusion: "Religious language is most defensible as cognitive — Aquinas' analogical realism does what believers actually want their words to do. Logical positivism is dead. Wittgensteinian non-cognitivism makes religious language safe by emptying its content. The cognitive cost is too high."
  }
];
