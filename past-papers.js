/* Past-paper-style practice questions, organised by topic.
   These are practice questions written in the OCR H573 style;
   each topic has 3-5 prompts that drill different angles. */
const PAST_PAPERS = {
  "plato-aristotle":[
    "\"Plato's reliance on reason produces nothing we can verify.\" Discuss. [40]",
    "Critically assess the view that Aristotle's Four Causes provide a convincing account of the world. [40]",
    "To what extent is the Form of the Good intelligible without religious commitment? [40]",
    "\"Aristotle's Prime Mover is too thin to count as God.\" Discuss. [40]"
  ],
  "soul-mind-body":[
    "\"Descartes' substance dualism is the only view that respects human dignity.\" Discuss. [40]",
    "Critically assess the view that the soul is best understood as the form of the body. [40]",
    "To what extent does materialism succeed in explaining the mind? [40]"
  ],
  "observation":[
    "\"Hume's critique destroys the teleological argument.\" Discuss. [40]",
    "Critically assess Aquinas' cosmological argument. [40]",
    "To what extent does evolution undermine the design argument? [40]",
    "\"Fine-tuning gives the teleological argument new force.\" Discuss. [40]"
  ],
  "reason":[
    "\"The ontological argument moves from definition to existence by sleight of hand.\" Discuss. [40]",
    "Critically assess Kant's claim that existence is not a predicate. [40]",
    "To what extent does the modal version of the ontological argument escape its traditional critics? [40]"
  ],
  "religious-experience":[
    "\"Religious experience gives no evidence to anyone but the experient.\" Discuss. [40]",
    "Critically assess William James' four marks of mystical experience. [40]",
    "To what extent do naturalistic explanations defeat the evidential value of religious experience? [40]",
    "\"Swinburne's principle of credulity gives religious experience real evidential weight.\" Discuss. [40]"
  ],
  "problem-of-evil":[
    "\"Augustine's theodicy fails because evolution rules out a literal Fall.\" Discuss. [40]",
    "Critically assess Hick's soul-making theodicy. [40]",
    "To what extent is the logical problem of evil answered by the free-will defence? [40]",
    "\"Theodicy is morally objectionable.\" Discuss. [40]"
  ],
  "attributes-god":[
    "\"A timeless God cannot act in time.\" Discuss. [40]",
    "Critically assess Swinburne's account of God as everlasting. [40]",
    "To what extent are the classical divine attributes coherent with one another? [40]"
  ],
  "religious-language-1":[
    "\"Negative theology preserves transcendence at the cost of saying anything.\" Discuss. [40]",
    "Critically assess Aquinas' doctrine of analogy. [40]",
    "To what extent does Tillich's symbol theory rescue religious language? [40]"
  ],
  "religious-language-2":[
    "\"The verification principle is self-defeating.\" Discuss. [40]",
    "Critically assess Flew's falsification challenge. [40]",
    "To what extent does Wittgenstein's language-games approach defend religious belief? [40]",
    "\"Religious language is meaningful only if it is cognitive.\" Discuss. [40]"
  ],
  "natural-law":[
    "\"Natural law's premise of a human telos is no longer defensible.\" Discuss. [40]",
    "Critically assess the doctrine of double effect. [40]",
    "To what extent is natural law a reliable method of moral decision-making? [40]",
    "\"Finnis' reconstruction abandons what made natural law natural.\" Discuss. [40]"
  ],
  "situation-ethics":[
    "\"Without rules, agape gives no determinate guidance.\" Discuss. [40]",
    "Critically assess Fletcher's six propositions. [40]",
    "To what extent is situation ethics genuinely Christian? [40]"
  ],
  "kant":[
    "\"Kant's prohibition on lying makes morality work against humanity.\" Discuss. [40]",
    "Critically assess the formula of humanity. [40]",
    "To what extent does the categorical imperative offer practical moral guidance? [40]",
    "\"Kantian ethics is too austere to be livable.\" Discuss. [40]"
  ],
  "utilitarianism":[
    "\"The justice problem is fatal to utilitarianism.\" Discuss. [40]",
    "Critically compare act and rule utilitarianism. [40]",
    "To what extent is Mill's qualitative utilitarianism an improvement on Bentham's? [40]",
    "\"Singer's preference utilitarianism makes moral demands no one can meet.\" Discuss. [40]"
  ],
  "euthanasia":[
    "\"Sanctity of life cannot be defended in secular medical ethics.\" Discuss. [40]",
    "Critically assess Rachels' claim that there is no moral difference between killing and letting die. [40]",
    "To what extent should voluntary euthanasia be legalised? [40]",
    "\"Natural law's prohibition on euthanasia is incompatible with patient autonomy.\" Discuss. [40]"
  ],
  "business-ethics":[
    "\"Friedman is right: the only social responsibility of business is profit.\" Discuss. [40]",
    "Critically assess stakeholder theory. [40]",
    "To what extent are whistle-blowers morally obliged to disclose? [40]",
    "\"Globalisation has done more harm than good.\" Discuss. [40]"
  ],
  "meta-ethics":[
    "\"Moore's open question argument destroys naturalism.\" Discuss. [40]",
    "Critically assess emotivism. [40]",
    "To what extent does intuitionism rest on cultural prejudice? [40]"
  ],
  "conscience":[
    "\"Freud's super-ego is more convincing than Aquinas' synderesis.\" Discuss. [40]",
    "Critically assess the view that conscience is the voice of God. [40]",
    "To what extent does modern psychology require us to reject classical accounts of conscience? [40]"
  ],
  "sexual-ethics":[
    "\"Religious ethics has nothing useful to say about modern sexual ethics.\" Discuss. [40]",
    "Critically assess natural law's treatment of homosexuality. [40]",
    "To what extent does Mill's harm principle settle sexual ethics? [40]"
  ],
  "augustine":[
    "\"Augustine's account of human nature is too pessimistic.\" Discuss. [40]",
    "Critically assess the doctrine of original sin. [40]",
    "To what extent does the doctrine of grace undermine human responsibility? [40]"
  ],
  "death-afterlife":[
    "\"Universalism removes the seriousness of moral choice.\" Discuss. [40]",
    "Critically assess C.S. Lewis' claim that the doors of hell are locked from inside. [40]",
    "To what extent is Matthew 25 compatible with exclusivist doctrines of salvation? [40]"
  ],
  "knowledge-god":[
    "\"Without revelation, no knowledge of God is possible.\" Discuss. [40]",
    "Critically assess Calvin's sensus divinitatis. [40]",
    "To what extent does natural theology survive Barth's critique? [40]"
  ],
  "jesus-christ":[
    "\"Jesus was a teacher of wisdom, nothing more.\" Discuss. [40]",
    "Critically assess the view that Jesus saw himself as Son of God. [40]",
    "To what extent does liberation theology give an adequate account of Jesus? [40]"
  ],
  "moral-principles":[
    "\"The Bible alone is sufficient for Christian ethics.\" Discuss. [40]",
    "Critically assess agape as the sole principle of Christian ethics. [40]",
    "To what extent is Christian ethics distinctive? [40]"
  ],
  "bonhoeffer":[
    "\"Bonhoeffer's involvement in the assassination plot was inconsistent with Christian ethics.\" Discuss. [40]",
    "Critically assess Bonhoeffer's doctrine of costly grace. [40]",
    "To what extent should Christians today practise civil disobedience? [40]"
  ],
  "pluralism-theology":[
    "\"Inclusivism is patronising; pluralism is honest.\" Discuss. [40]",
    "Critically assess Rahner's doctrine of anonymous Christians. [40]",
    "To what extent can Christianity accept other religions as equally valid? [40]"
  ],
  "pluralism-society":[
    "\"Inter-faith dialogue has done nothing for social cohesion.\" Discuss. [40]",
    "Critically assess the practice of scriptural reasoning. [40]",
    "To what extent is Christian mission ethical in a pluralist society? [40]"
  ],
  "gender-society":[
    "\"Christian teaching on gender should resist secular feminism.\" Discuss. [40]",
    "Critically assess Mulieris Dignitatem. [40]",
    "To what extent is the traditional family theologically required? [40]"
  ],
  "gender-theology":[
    "\"Christianity is essentially sexist.\" Discuss. [40]",
    "Critically assess Ruether's reform position against Daly's exit position. [40]",
    "To what extent does Christ's maleness affect the salvation of women? [40]"
  ],
  "secularism":[
    "\"Freud's account of religion proves too much.\" Discuss. [40]",
    "Critically assess Dawkins' arguments against religion. [40]",
    "To what extent should Christianity play a role in public life? [40]"
  ],
  "liberation":[
    "\"Liberation theology imports atheism by stealth.\" Discuss. [40]",
    "Critically assess the preferential option for the poor. [40]",
    "To what extent should Christian theology engage with Marxist ideology? [40]"
  ]
};

/* Comparison tables — side-by-side rivals across the specification */
const COMPARISONS = [
  {
    id:"plato-aristotle-reality", title:"Plato vs Aristotle on <em>Reality</em>", paper:"P1",
    headers:["Question","Plato","Aristotle"],
    rows:[
      ["What is ultimately real?","Forms (immaterial, eternal, perfect)","Substances (matter + form, in this world)"],
      ["How is reality known?","Reason (rationalism)","Sense experience (empiricism)"],
      ["Crowning principle","Form of the Good","Prime Mover (pure actuality)"],
      ["Status of senses","Deceptive shadows","Starting point of knowledge"],
      ["Famous illustration","Cave (Republic VII)","Four Causes (Physics II)"],
      ["A-star verdict","Wins on transcendence (the Good)","Wins on method (disciplined empiricism)"]
    ]
  },
  {
    id:"plato-aristotle-soul", title:"Plato vs Aristotle on the <em>Soul</em>", paper:"P1",
    headers:["Question","Plato","Aristotle"],
    rows:[
      ["Nature of soul","Immaterial substance","Form of the living body"],
      ["Separable from body?","Yes — pre-exists and survives","No — soul dies with the body"],
      ["Learning","Recollection (anamnesis) of Forms","From sense experience"],
      ["Body","Prison of the soul","Necessary expression of soul"],
      ["Compatible with bodily resurrection?","No — body is left behind","Yes — form re-instantiated in glorified body"]
    ]
  },
  {
    id:"design-cosmological", title:"Teleological vs Cosmological <em>Arguments</em>", paper:"P1",
    headers:["Question","Teleological","Cosmological"],
    rows:[
      ["Starting point","Apparent design/purpose in nature","The existence of contingent things"],
      ["Key thinkers","Paley (watch), Aquinas (5th Way), Swinburne","Aquinas (Ways 1-3), Leibniz"],
      ["A posteriori?","Yes","Yes"],
      ["Main critic","Hume on analogy; Darwin on natural selection","Hume on causation; Russell on brute fact"],
      ["Survives in modern form?","Fine-tuning version still defended","Modern PSR arguments (Pruss, Koons)"]
    ]
  },
  {
    id:"theodicies", title:"Augustine vs Hick <em>Theodicies</em>", paper:"P1",
    headers:["Question","Augustinian","Irenaean (Hick)"],
    rows:[
      ["Origin of evil","Misuse of free will at the Fall","Built into a soul-making creation"],
      ["Nature of evil","Privatio boni (privation of good)","Real, instrumentally good"],
      ["Pre-Fall world","Perfect","Imperfect by design"],
      ["Salvation","Election (some saved, others damned)","Universalist (all reach God)"],
      ["Key text","Romans 5; Genesis 3","Irenaeus on image vs likeness"],
      ["Fatal weakness","Requires literal Fall (untenable)","Gratuitous suffering, animal pain pre-humans"]
    ]
  },
  {
    id:"eternity", title:"Boethius vs Swinburne on <em>God and Time</em>", paper:"P1",
    headers:["Question","Boethius","Swinburne"],
    rows:[
      ["God's relation to time","Eternal (outside time)","Everlasting (in time, no beginning/end)"],
      ["Knows future free actions?","Yes — sees them simultaneously","No — they aren't yet facts"],
      ["Solves freedom problem by","Knowledge is not foreknowledge","Voluntary divine self-limitation"],
      ["Action in time","Difficult to articulate","Straightforward — God responds"],
      ["Biblical fit","Strained","Strong (kenosis, prayer, narrative)"],
      ["Philosophical cost","Mystery of timeless agency","Classical omniscience curtailed"]
    ]
  },
  {
    id:"religious-language", title:"Three Approaches to <em>Religious Language</em>", paper:"P1",
    headers:["","Negative (via negativa)","Analogical (Aquinas)","Symbolic (Tillich)"],
    rows:[
      ["Thinkers","Pseudo-Dionysius, Maimonides","Aquinas","Tillich"],
      ["Claim","Only say what God is NOT","Apply terms analogically","Religious terms are symbols"],
      ["Strength","Preserves transcendence","Says something true; preserves difference","Captures liturgical power"],
      ["Weakness","Nothing left to worship (Davies)","Collapses into univocity? (Scotus)","Cannot discriminate between theologies"],
      ["Verdict","Discipline, not doctrine","Most defensible","Evocative but slippery"]
    ]
  },
  {
    id:"natural-vs-situation", title:"Natural Law vs Situation <em>Ethics</em>", paper:"P2",
    headers:["Question","Natural Law","Situation Ethics"],
    rows:[
      ["Right-making feature","Conformity to telos / precepts","What love (agape) demands"],
      ["Foundation","Aristotelian teleology","Christian agape"],
      ["Absolute rules","Five primary precepts (with double effect)","Only love is absolute"],
      ["Predictability","High","Low (case-by-case)"],
      ["Risk","Rigidity, can ignore consequences","Subjectivism; self-serving 'love'"],
      ["Key thinker","Aquinas (Finnis modernised)","Joseph Fletcher"]
    ]
  },
  {
    id:"kant-vs-mill", title:"Kant vs Utilitarianism", paper:"P2",
    headers:["Question","Kant","Utilitarianism"],
    rows:[
      ["Right-making feature","Conformity to duty","Maximised welfare"],
      ["Treats persons as","Ends in themselves","Units of utility"],
      ["Lying","Always wrong (even to murderer)","Permissible if produces best outcome"],
      ["Justice","Built in via dignity","Vulnerable: framing innocent can win"],
      ["Calculation","Not required","Demanding; consequences hard to predict"],
      ["Best for","Rights, dignity, prohibitions","Policy, triage, aggregate welfare"]
    ]
  },
  {
    id:"conscience-aquinas-freud", title:"Conscience: Aquinas vs <em>Freud</em>", paper:"P2",
    headers:["Question","Aquinas","Freud"],
    rows:[
      ["Source","Reason given by God","Internalised parental authority"],
      ["Components","Synderesis (infallible) + conscientia (fallible)","Super-ego (formed in childhood)"],
      ["Reliability","Synderesis is reliable; reasoning may err","Super-ego often distorted, neurotic"],
      ["Goal","Discern God's law in particulars","Free the ego from irrational guilt"],
      ["Educated by","Reason and tradition","Psychoanalysis"]
    ]
  },
  {
    id:"pluralism-positions", title:"Three Positions on <em>Other Religions</em>", paper:"P3",
    headers:["","Exclusivism","Inclusivism","Pluralism"],
    rows:[
      ["Key thinker","Cyprian, Barth","Rahner (Vatican II)","Hick"],
      ["Christ","Sole, explicit saviour","Sole but anonymous saviour","One culturally-conditioned revelation"],
      ["Other religions","No salvific value","Genuine truth and grace","Equally valid paths"],
      ["Salvation outside Church","No","Yes — through Christ implicitly","Yes — equally"],
      ["Strength","Preserves Christ's uniqueness","Universal salvific will + Christ","Respects all traditions"],
      ["Weakness","Damns billions","'Patronising'","Reduces Christ to one option"]
    ]
  },
  {
    id:"feminist-theology", title:"Ruether vs Daly on <em>Feminist Theology</em>", paper:"P3",
    headers:["Question","Ruether","Daly"],
    rows:[
      ["Diagnosis","Historically patriarchal","Essentially patriarchal"],
      ["Christ's maleness","Historically contingent","Symbolically definitive"],
      ["Bible","Contains liberating resources","Sanctifies male dominance"],
      ["Solution","Reform from within","Exit; goddess spirituality"],
      ["Inheritance","Mainstream feminist theology","Post-Christian feminism"],
      ["A-star verdict","Reform is real and has happened","Exit proves too much"]
    ]
  },
  {
    id:"ethical-theories-summary", title:"Six Ethical Theories at a <em>Glance</em>", paper:"P2",
    headers:["Theory","Right-making feature","Greatest strength","Greatest weakness"],
    rows:[
      ["Natural Law","Conformity to telos","Coherent system, objective","Telos premise dies with biology"],
      ["Situation Ethics","What love demands","Person-centred, biblical","Subjective without rules"],
      ["Kantian Ethics","Universalisable maxim, dignity","Grounds rights absolutely","Lying-to-murderer rigorism"],
      ["Utilitarianism","Maximised welfare","Impartial, scientific, public","Justice fails; demanding"],
      ["Virtue Ethics","Cultivates flourishing","Holistic, motivational","Hard to apply to cases"],
      ["Divine Command","God's command","Theistically grounded","Euthyphro: arbitrary or redundant"]
    ]
  }
];
