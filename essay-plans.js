/* OCR H573 — Niche / advanced scholar references, organised by topic.
   Each plan in ESSAY_PLANS is rendered with the relevant niche scholars
   appended, giving students a wider range of named thinkers to deploy. */
const NICHE_SCHOLARS = {
  "Ancient Philosophical Influences": [
    {name:"Iris Murdoch",area:"Plato",position:"Reads Plato's Good as moral psychology — 'unselfing' attention; Sovereignty of Good"},
    {name:"Bernard Williams",area:"both",position:"Plato's ethical idealism vs. Aristotelian realism — the 'Greek miracle' debated"},
    {name:"Martha Nussbaum",area:"Aristotle",position:"Aristotelian capabilities theory; The Fragility of Goodness"},
    {name:"Pierre Hadot",area:"both",position:"Philosophy as way of life — both Plato and Aristotle as spiritual exercise"},
    {name:"G.E.L. Owen",area:"Aristotle",position:"Aristotle's distinction between primary and secondary substance"},
    {name:"Gail Fine",area:"Plato",position:"Defends Plato's Forms against Aristotelian regress objections"},
    {name:"Lloyd Gerson",area:"Plato",position:"Modern Platonist; Aristotle as misreading Plato, not refuting"},
    {name:"Julia Annas",area:"both",position:"Hellenistic philosophy bridge — Stoic-Epicurean inheritance"},
    {name:"Aquinas",area:"both",position:"Synthesises Aristotelian method with Platonic theology — the Christian resolution"}
  ],
  "Soul, Mind and Body": [
    {name:"David Chalmers",area:"qualia",position:"The 'hard problem' of consciousness; zombies argument against materialism"},
    {name:"Daniel Dennett",area:"materialism",position:"Eliminativist — consciousness is parallel cognitive processing, no Cartesian theatre"},
    {name:"Frank Jackson",area:"qualia",position:"Mary's room — physical knowledge incomplete (later partially recanted)"},
    {name:"Thomas Nagel",area:"qualia",position:"'What Is It Like to Be a Bat?' — subjective experience irreducible"},
    {name:"Saul Kripke",area:"dualism",position:"Modal argument against identity theory in Naming and Necessity"},
    {name:"Hilary Putnam",area:"functionalism",position:"Multiple realisability — same mental state in different substrates"},
    {name:"John Searle",area:"middle",position:"Biological naturalism — Chinese Room; consciousness as biological"},
    {name:"Patricia Churchland",area:"materialism",position:"Neurophilosophy — folk psychology will be replaced"},
    {name:"Galen Strawson",area:"panpsychism",position:"Consciousness fundamental — modern panpsychism"},
    {name:"Aquinas",area:"hylomorphism",position:"Christian appropriation — soul as form of body, allowing resurrection"}
  ],
  "Arguments from Observation": [
    {name:"Robin Collins",area:"fine-tuning",position:"Bayesian fine-tuning — design more probable than chance given constants"},
    {name:"John Polkinghorne",area:"theistic evolution",position:"Scientist-theologian — designed PROCESS not designed product"},
    {name:"Simon Conway Morris",area:"convergence",position:"Convergent evolution suggests inevitability — possible design indicator"},
    {name:"Michael Behe",area:"ID",position:"Irreducible complexity in Darwin's Black Box (rejected by mainstream biology)"},
    {name:"William Lane Craig",area:"Kalam",position:"Kalam cosmological argument — Big Bang as cosmic beginning"},
    {name:"Edward Feser",area:"Thomistic",position:"Modern Thomist defence of Aquinas' Five Ways"},
    {name:"Alexander Pruss",area:"cosmological",position:"Modern PSR-based cosmological arguments"},
    {name:"Stephen Jay Gould",area:"evolution",position:"NOMA (Non-Overlapping Magisteria) — science and religion separate"},
    {name:"Richard Swinburne",area:"cumulative",position:"Cumulative probabilistic case for theism — Existence of God"},
    {name:"Sean Carroll",area:"physics",position:"Multiverse cosmologist — fine-tuning explained without design"}
  ],
  "Arguments from Reason": [
    {name:"Charles Hartshorne",area:"modal",position:"Process theology's modal ontological argument — God as necessarily possible"},
    {name:"Norman Malcolm",area:"defender",position:"Revived Proslogion 3 (necessary existence) in 1960 against Kant"},
    {name:"Alvin Plantinga",area:"modal",position:"Possible-worlds modal ontological argument — God in some world → all worlds"},
    {name:"Graham Oppy",area:"critic",position:"Modern atheist critique — modal arguments are question-begging"},
    {name:"Gottlob Frege",area:"existence",position:"Existence as second-order predicate — formalised Kant's insight"},
    {name:"Bertrand Russell",area:"existence",position:"'On Denoting' — existence statements analysed via quantifiers"},
    {name:"Robert Maydole",area:"contemporary",position:"Modal-perfection argument — recent formal version of ontological argument"},
    {name:"Peter van Inwagen",area:"defender",position:"Modal ontological argument defended in possible-worlds framework"},
    {name:"Brian Davies",area:"Thomist",position:"Aquinas rejected ontological argument — analytic Thomist account"}
  ],
  "Religious Experience": [
    {name:"William Alston",area:"defender",position:"Perceiving God — religious experience as analogous to sense perception"},
    {name:"Caroline Franks Davis",area:"defender",position:"The Evidential Force of Religious Experience — systematic defence"},
    {name:"Walter Stace",area:"typology",position:"Extrovertive vs introvertive mysticism; perennialist position"},
    {name:"Steven Katz",area:"critic",position:"Constructivism — all mystical experience culturally mediated, no pure encounter"},
    {name:"Mark Wynn",area:"emotional",position:"Religious experience as emotion-based perception of value"},
    {name:"Michael Persinger",area:"reductive",position:"Temporal-lobe stimulation produces 'sensed presence' effects"},
    {name:"Andrew Newberg",area:"neurotheology",position:"Brain imaging during prayer/meditation; neural correlates of mystical experience"},
    {name:"Evelyn Underhill",area:"mystical",position:"Mysticism (1911) — psychological-theological account of mystical stages"},
    {name:"Rudolf Otto",area:"numinous",position:"The Idea of the Holy — mysterium tremendum et fascinans"},
    {name:"Bernard Lonergan",area:"transcendental",position:"Religious experience as transcendental consciousness; Method in Theology"}
  ],
  "Problem of Evil": [
    {name:"Marilyn McCord Adams",area:"horrendous",position:"Horrendous evils require eschatological defeat, not just outweighing"},
    {name:"Stephen Wykstra",area:"sceptical theism",position:"CORNEA — we cannot judge whether suffering is gratuitous"},
    {name:"William Rowe",area:"evidential",position:"Fawn-in-forest-fire argument; standard evidential problem"},
    {name:"Eleonore Stump",area:"theodicy",position:"Wandering in Darkness — narrative theodicy; suffering as relational"},
    {name:"Peter van Inwagen",area:"defender",position:"The Problem of Evil — free-will defence with vagueness theory"},
    {name:"John Hick",area:"soul-making",position:"Irenaean theodicy; epistemic distance; universalist eschatology"},
    {name:"Richard Swinburne",area:"theodicy",position:"Suffering provides knowledge needed for libertarian freedom"},
    {name:"Paul Draper",area:"hypothesis",position:"Hypothesis of indifference — naturalism better explains evil than theism"},
    {name:"D.Z. Phillips",area:"critic",position:"The Problem of Evil and the Problem of God — theodicies as morally monstrous"},
    {name:"Dostoevsky (Ivan Karamazov)",area:"literary",position:"'Returns the ticket' — innocent suffering cannot be justified by future bliss"}
  ],
  "Nature of God": [
    {name:"Anthony Kenny",area:"critic",position:"The God of the Philosophers — classical attributes mutually incompatible"},
    {name:"Eleonore Stump",area:"defender",position:"ET-simultaneity defence of Boethian eternity (with Norman Kretzmann)"},
    {name:"Nicholas Wolterstorff",area:"everlasting",position:"God Everlasting — biblical case for everlasting against atemporal God"},
    {name:"William Lane Craig",area:"compromise",position:"Timeless without creation, temporal since creation"},
    {name:"Peter Geach",area:"omnipotence",position:"Four kinds of omnipotence; Anselmian solution to stone paradox"},
    {name:"Linda Zagzebski",area:"foreknowledge",position:"Molinist middle knowledge — God knows counterfactuals of freedom"},
    {name:"Brian Davies",area:"classical",position:"Defender of classical theism against process theology"},
    {name:"Charles Hartshorne",area:"process",position:"Process theology — God as dipolar, affected by world"},
    {name:"Jürgen Moltmann",area:"passible",position:"The Crucified God — divine suffering, against impassibility"},
    {name:"Thomas Morris",area:"defender",position:"Anselmian Explorations — perfect being theology"}
  ],
  "Religious Language (Negative/Analogical/Symbolic)": [
    {name:"Brian Davies",area:"critic",position:"Devastating critique of Maimonides' pure negative theology"},
    {name:"Duns Scotus",area:"univocity",position:"Against Aquinas: 'being' must be univocal or analogy collapses"},
    {name:"Ian Ramsey",area:"models",position:"Religious Language (1957) — models and qualifiers; disclosure"},
    {name:"Frederick Copleston",area:"defender",position:"Defends Aquinas' analogy as preserving genuine cognitive content"},
    {name:"Karl Barth",area:"analogy of faith",position:"Analogia fidei replaces analogia entis — only revelation enables God-talk"},
    {name:"John Hick",area:"eschatological",position:"Verification at the eschaton — religious language meaningful via afterlife"},
    {name:"Sallie McFague",area:"metaphor",position:"Models of God — Mother, Lover, Friend; metaphorical theology"},
    {name:"Janet Soskice",area:"metaphor",position:"Metaphor and Religious Language — defence of realist metaphor"},
    {name:"Paul Tillich",area:"symbol",position:"Religious symbols participate in what they signify"},
    {name:"Pseudo-Dionysius",area:"mystical",position:"Mystical Theology — ascent through negation to encounter beyond names"}
  ],
  "Religious Language (20th Century)": [
    {name:"A.J. Ayer",area:"verification",position:"Language, Truth and Logic — strong verification principle"},
    {name:"Antony Flew",area:"falsification",position:"Theology and Falsification — death by a thousand qualifications"},
    {name:"R.M. Hare",area:"bliks",position:"Bliks — unfalsifiable but meaningful frameworks; lunatic Oxford don"},
    {name:"Basil Mitchell",area:"defender",position:"Partisan parable — faith qualified but not surrendered by evidence"},
    {name:"D.Z. Phillips",area:"Wittgensteinian",position:"Religion Without Explanation — religion as form of life, non-cognitive"},
    {name:"Norman Malcolm",area:"Wittgensteinian",position:"Religious belief as a form of life; Wittgenstein's lectures on religion"},
    {name:"Richard Swinburne",area:"cognitive",position:"The Coherence of Theism — religious language as literally meaningful"},
    {name:"Kai Nielsen",area:"critic",position:"Sceptical critic of Wittgensteinian fideism; demands cognitive content"},
    {name:"John Hick",area:"verification",position:"Eschatological verification — religious claims testable at end of life"},
    {name:"Aquinas",area:"analogy",position:"Pre-emptive answer to positivism — analogical realism survives"}
  ],
  "Natural Law": [
    {name:"John Finnis",area:"new natural law",position:"Natural Law and Natural Rights — seven basic goods grasped by practical reason"},
    {name:"Germain Grisez",area:"new natural law",position:"Co-architect of new natural law theory with Finnis"},
    {name:"Joseph Boyle",area:"new natural law",position:"Practical reasonableness in modern natural law tradition"},
    {name:"Alasdair MacIntyre",area:"Thomist",position:"After Virtue — defends Aristotelian-Thomist tradition against fragmentation"},
    {name:"G.E.M. Anscombe",area:"foundations",position:"Modern Moral Philosophy (1958) — revived virtue ethics"},
    {name:"Phillipa Foot",area:"naturalism",position:"Natural Goodness — naturalistic ethics via human function"},
    {name:"Charles Curran",area:"dissent",position:"Catholic moral theologian critical of Humanae Vitae's natural-law reasoning"},
    {name:"Bernard Hoose",area:"proportionalism",position:"Primary precepts absolute; secondary precepts revisable"},
    {name:"Servais Pinckaers",area:"recovery",position:"Sources of Christian Ethics — virtue and beatitude in Catholic ethics"},
    {name:"Lisa Sowle Cahill",area:"reformer",position:"Sex, Gender, and Christian Ethics — revisionist Catholic position"}
  ],
  "Situation Ethics": [
    {name:"Joseph Fletcher",area:"founder",position:"Situation Ethics (1966) — agape as sole moral absolute, six propositions"},
    {name:"William Barclay",area:"critic",position:"Ethics in a Permissive Society — situationism is fine for saints, dangerous for sinners"},
    {name:"Reinhold Niebuhr",area:"contrast",position:"Christian realism — love is impossible ideal; rules needed in fallen world"},
    {name:"Paul Ramsey",area:"critic",position:"Christian ethicist critiquing Fletcher's lack of biblical grounding"},
    {name:"Richard McCormick",area:"proportionalist",position:"Catholic proportionalist — theological alternative to Fletcher"},
    {name:"John A.T. Robinson",area:"sympathetic",position:"Honest to God — supported situationist approach against rigid morality"},
    {name:"Stanley Hauerwas",area:"virtue",position:"Virtue over situation — Church forms character that knows what love demands"},
    {name:"Bernard Häring",area:"Catholic",position:"The Law of Christ — Catholic moral theology with personalist emphasis"},
    {name:"Søren Kierkegaard",area:"existentialist",position:"Background — ethical decisions made in existential commitment, not by rule"},
    {name:"Anders Nygren",area:"agape",position:"Agape and Eros — distinguishes Christian self-giving love from erotic attraction"}
  ],
  "Kantian Ethics": [
    {name:"Onora O'Neill",area:"contemporary",position:"Constructions of Reason — Kantian constructivism; global justice"},
    {name:"Christine Korsgaard",area:"contemporary",position:"Sources of Normativity — reflective endorsement as foundation"},
    {name:"W.D. Ross",area:"pluralist",position:"Prima facie duties (fidelity, reparation, justice, beneficence, etc.)"},
    {name:"Bernard Williams",area:"critic",position:"Moral saint critique — Kantian agent has no ground projects"},
    {name:"Iris Murdoch",area:"critic",position:"The Sovereignty of Good — Kant missed role of attention and love"},
    {name:"Susan Wolf",area:"critic",position:"Moral Saints — Kantian saintly life not admirable"},
    {name:"Benjamin Constant",area:"historical",position:"On the Right to Lie — Kant's lying-to-murderer rigorism attacked"},
    {name:"Korsgaard",area:"defender",position:"Modern Kantian response to lying problem via communicative context"},
    {name:"Marcia Baron",area:"defender",position:"Kantian Ethics Almost Without Apology — modern Kantian defence"},
    {name:"Schopenhauer",area:"critic",position:"Kant's ethics is divine command theology in secular dress"}
  ],
  "Utilitarianism": [
    {name:"Bernard Williams",area:"critic",position:"Sheriff case; integrity objection; critique of utilitarianism"},
    {name:"Robert Nozick",area:"critic",position:"Anarchy, State, Utopia — utility monster; experience machine"},
    {name:"H.J. McCloskey",area:"critic",position:"Organ-harvest case — utility recommends killing one to save five"},
    {name:"John Rawls",area:"critic",position:"A Theory of Justice — utilitarianism doesn't take distinction between persons seriously"},
    {name:"R.M. Hare",area:"defender",position:"Two-level utilitarianism — intuitive level uses rules, critical level calculates"},
    {name:"Derek Parfit",area:"contemporary",position:"Reasons and Persons — deep problems in personal identity and aggregation"},
    {name:"Henry Sidgwick",area:"classical",position:"The Methods of Ethics — most rigorous defence; conceded utility requires intuition"},
    {name:"Peter Singer",area:"contemporary",position:"Animal Liberation; Famine, Affluence, and Morality; preference utilitarianism"},
    {name:"R.B. Brandt",area:"rule",position:"Rule utilitarian; ideal moral code theory"},
    {name:"J.J.C. Smart",area:"defender",position:"Outline of a System of Utilitarian Ethics (with Williams critique)"}
  ],
  "Euthanasia": [
    {name:"James Rachels",area:"defender",position:"Active and Passive Euthanasia (1975) — no moral difference between killing and letting die"},
    {name:"Peter Singer",area:"defender",position:"Rethinking Life and Death — sanctity incoherent post-brain-death"},
    {name:"Daniel Callahan",area:"opponent",position:"Hastings Center — slippery slope, corruption of medicine"},
    {name:"Jonathan Glover",area:"defender",position:"Causing Death and Saving Lives (1977) — careful utilitarian defence"},
    {name:"Helga Kuhse",area:"defender",position:"The Sanctity-of-Life Doctrine in Medicine (1987) — critique of sanctity"},
    {name:"Margaret Battin",area:"defender",position:"The Least Worst Death — rigorous ethical analysis of physician-assisted dying"},
    {name:"Pope John Paul II",area:"opponent",position:"Evangelium Vitae (1995) — reaffirms absolute prohibition; permits double-effect palliation"},
    {name:"Wesley Smith",area:"opponent",position:"Forced Exit — leading bioethics opponent of legalisation"},
    {name:"Ronald Dworkin",area:"defender",position:"Life's Dominion — autonomy and dignity arguments for euthanasia"},
    {name:"Stephen Pope",area:"Catholic",position:"Catholic ethicist; defends double-effect framework"}
  ],
  "Business Ethics": [
    {name:"Milton Friedman",area:"shareholder",position:"NYT 1970 — social responsibility of business is profit"},
    {name:"R. Edward Freeman",area:"stakeholder",position:"Strategic Management: A Stakeholder Approach — founding stakeholder theory"},
    {name:"Archie Carroll",area:"CSR",position:"Pyramid of CSR — economic, legal, ethical, philanthropic responsibilities"},
    {name:"Sissela Bok",area:"whistleblowing",position:"Lying; Secrets — seminal works on whistleblowing ethics"},
    {name:"John Rawls",area:"justice",position:"Justice as fairness applies to economic structure; underpins CSR's egalitarian critique"},
    {name:"Naomi Klein",area:"critic",position:"No Logo; This Changes Everything — systemic critique of globalised capitalism"},
    {name:"Amartya Sen",area:"capability",position:"Development as Freedom — capability approach to economic justice"},
    {name:"Michael Porter",area:"shared value",position:"Creating Shared Value (with Kramer, 2011) — business strategy reconceived ethically"},
    {name:"Joseph Stiglitz",area:"economist",position:"Critic of unregulated globalisation; economic justice arguments"},
    {name:"Muhammad Yunus",area:"microfinance",position:"Banker to the Poor — social business as ethical capitalism"}
  ],
  "Meta-ethics": [
    {name:"G.E. Moore",area:"intuitionism",position:"Principia Ethica (1903) — naturalistic fallacy, open question argument"},
    {name:"W.D. Ross",area:"intuitionism",position:"The Right and the Good (1930) — pluralist intuitionism with prima facie duties"},
    {name:"A.J. Ayer",area:"emotivism",position:"Language, Truth and Logic (1936) — emotivism from logical positivism"},
    {name:"C.L. Stevenson",area:"emotivism",position:"Ethics and Language (1944) — emotivism with attention to persuasive force"},
    {name:"R.M. Hare",area:"prescriptivism",position:"The Language of Morals (1952) — prescriptivism succeeds emotivism"},
    {name:"J.L. Mackie",area:"error theory",position:"Ethics: Inventing Right and Wrong (1977) — moral claims systematically false"},
    {name:"Nicholas Sturgeon",area:"naturalism",position:"Cornell realism — moral facts as natural facts that resist reduction"},
    {name:"Simon Blackburn",area:"quasi-realism",position:"Spreading the Word — expressivism that explains apparent realism"},
    {name:"Allan Gibbard",area:"expressivism",position:"Wise Choices, Apt Feelings — norm-expressivism"},
    {name:"Jonathan Haidt",area:"empirical",position:"The Righteous Mind — moral psychology; intuition precedes reasoning"}
  ],
  "Conscience": [
    {name:"Erich Fromm",area:"humanistic",position:"Man for Himself (1947) — authoritarian vs humanistic conscience"},
    {name:"John Henry Newman",area:"Catholic",position:"'Aboriginal Vicar of Christ' — conscience as voice of God; Letter to Duke of Norfolk"},
    {name:"Joseph Butler",area:"18th century",position:"Fifteen Sermons (1726) — conscience as superintendent faculty"},
    {name:"Carl Rogers",area:"humanistic",position:"Organismic valuing process — humanistic psychology"},
    {name:"Lawrence Kohlberg",area:"developmental",position:"Stages of moral development — pre-conventional, conventional, post-conventional"},
    {name:"Carol Gilligan",area:"feminist",position:"In a Different Voice (1982) — ethics of care; gendered moral psychology"},
    {name:"Jonathan Haidt",area:"empirical",position:"Moral judgements are post-hoc rationalisations of intuitions"},
    {name:"Charles Taylor",area:"hermeneutic",position:"Sources of the Self — conscience articulates moral sources we inhabit"},
    {name:"James Rest",area:"Defining Issues Test",position:"Empirical research on moral reasoning development"},
    {name:"Robert Kegan",area:"developmental",position:"In Over Our Heads — orders of consciousness in moral development"}
  ],
  "Sexual Ethics": [
    {name:"Michel Foucault",area:"genealogy",position:"The History of Sexuality (1976-84) — sexual ethics as historically constructed"},
    {name:"John Finnis",area:"conservative",position:"New natural law defence of traditional sexual ethics"},
    {name:"Margaret Farley",area:"Catholic feminist",position:"Just Love (2006) — framework for sexual ethics"},
    {name:"Eugene Rogers",area:"theological",position:"Sexuality and the Christian Body (1999) — theological case for same-sex marriage"},
    {name:"Lisa Sowle Cahill",area:"revisionist",position:"Sex, Gender, and Christian Ethics — revisionist Catholic position"},
    {name:"Robert P. George",area:"conjugal view",position:"What is Marriage? (with Girgis, Anderson) — conjugal-view defence"},
    {name:"Mary Pellauer",area:"feminist",position:"Feminist sexual ethics — consent necessary but not sufficient"},
    {name:"Stanley Grenz",area:"evangelical",position:"Sexual Ethics — Protestant evangelical engagement"},
    {name:"Sallie McFague",area:"ecofeminist",position:"Sexuality as embodied spirituality; metaphorical theology applied"},
    {name:"Rowan Williams",area:"Anglican",position:"The Body's Grace — theology of desire and embodied love"}
  ],
  "Augustine on Human Nature": [
    {name:"Pelagius",area:"opponent",position:"Original sin denied; humans can choose good without grace; condemned 418"},
    {name:"Friedrich Schleiermacher",area:"liberal",position:"The Christian Faith (1830) — original sin as universal solidarity, not biological"},
    {name:"Reinhold Niebuhr",area:"realist",position:"The Nature and Destiny of Man — Augustinian realism without literal Fall"},
    {name:"Karl Rahner",area:"Catholic",position:"Original sin as mythic encoding of universal human condition"},
    {name:"Alister McGrath",area:"evangelical",position:"Defends Augustinian core through demythologised reading"},
    {name:"Daphne Hampson",area:"post-Christian",position:"After Christianity — feminist post-Christian rejection of Augustinian anthropology"},
    {name:"Charles Taylor",area:"philosophical",position:"A Secular Age — modern selfhood shaped by Augustinian inwardness"},
    {name:"Matthew Levering",area:"contemporary",position:"Engaging the Doctrine of Marriage; modern Catholic reading"},
    {name:"James K.A. Smith",area:"contemporary",position:"You Are What You Love — Augustinian desire-formation theology"},
    {name:"Sarah Coakley",area:"feminist",position:"God, Sexuality and the Self — recovers contemplative theology with feminist insight"}
  ],
  "Death and Afterlife": [
    {name:"John Hick",area:"universalist",position:"Death and Eternal Life (1976) — pluralist universalism"},
    {name:"C.S. Lewis",area:"locked-inside",position:"The Great Divorce (1945) — doors of hell locked from inside"},
    {name:"Jürgen Moltmann",area:"reconciliationist",position:"The Coming of God (1996) — reconciliationist eschatology"},
    {name:"David Bentley Hart",area:"universalist",position:"That All Shall Be Saved (2019) — rigorous philosophical universalism"},
    {name:"N.T. Wright",area:"resurrection",position:"Surprised by Hope (2007) — resurrection of body, not going to heaven"},
    {name:"Origen",area:"apokatastasis",position:"Ultimate restoration of all things; condemned at Constantinople 553"},
    {name:"Karl Barth",area:"hopeful",position:"Church Dogmatics — 'apokatastasis is forbidden, but hope is required'"},
    {name:"Hans Urs von Balthasar",area:"Catholic hope",position:"Dare We Hope That All Men Be Saved? (1986)"},
    {name:"Gregory of Nyssa",area:"patristic",position:"Universalist tradition predating Augustine; restoration of all rational creatures"},
    {name:"Thomas Talbott",area:"contemporary",position:"The Inescapable Love of God — philosophical defence of universalism"}
  ],
  "Knowledge of God": [
    {name:"Karl Barth",area:"revelational",position:"Church Dogmatics — emphatic 'Nein!' to Brunner on natural theology"},
    {name:"Emil Brunner",area:"modest",position:"Nature and Grace (1934) — modest natural theology against Barth"},
    {name:"Alvin Plantinga",area:"Reformed",position:"Warranted Christian Belief — properly basic theistic belief"},
    {name:"Wolfhart Pannenberg",area:"public",position:"Systematic Theology — rational theology as public truth-claims"},
    {name:"John Calvin",area:"sensus",position:"Institutes I.3-5 — sensus divinitatis"},
    {name:"Vatican I (1869-70)",area:"Catholic",position:"Dei Filius: God knowable with certainty by reason from creation"},
    {name:"Aquinas",area:"integrated",position:"Summa I.2: God demonstrable; I.12: essence not graspable in this life"},
    {name:"Anselm",area:"fides",position:"Fides quaerens intellectum — faith seeking understanding"},
    {name:"Richard Swinburne",area:"probabilistic",position:"Cumulative case for theism via Bayesian probability"},
    {name:"William Alston",area:"perception",position:"Perceiving God — religious experience as analogous to perception"}
  ],
  "Person of Jesus Christ": [
    {name:"E.P. Sanders",area:"historical",position:"Jesus and Judaism (1985) — historical Jesus as eschatological prophet"},
    {name:"N.T. Wright",area:"continuity",position:"Jesus and the Victory of God — Jesus enacting Israel's return from exile"},
    {name:"Geza Vermes",area:"Jewish",position:"Jesus the Jew (1973) — charismatic Galilean Hasid"},
    {name:"Albert Schweitzer",area:"apocalyptic",position:"The Quest of the Historical Jesus — failed apocalyptic prophet"},
    {name:"Rudolf Bultmann",area:"demythologising",position:"Jesus Christ and Mythology — demythologisation for modern preaching"},
    {name:"C.S. Lewis",area:"apologetic",position:"'Liar, lunatic, or Lord' trilemma in Mere Christianity"},
    {name:"Jürgen Moltmann",area:"crucified",position:"The Crucified God — cross as God's solidarity with godforsaken"},
    {name:"Gustavo Gutiérrez",area:"liberator",position:"Jesus as liberator; liberation Christology"},
    {name:"Edward Schillebeeckx",area:"Catholic",position:"Jesus: An Experiment in Christology — Catholic historical-critical approach"},
    {name:"Larry Hurtado",area:"early high",position:"Lord Jesus Christ — earliest Christians worshipped Jesus alongside God"}
  ],
  "Christian Moral Principles": [
    {name:"Martin Luther",area:"sola scriptura",position:"Freedom of the Christian; conscience captive to Word"},
    {name:"Karl Barth",area:"Word-derived",position:"Ethics derived from theology of the Word; rejects autonomous moral reasoning"},
    {name:"Stanley Hauerwas",area:"ecclesial",position:"The Peaceable Kingdom — Christian ethics is narrative, virtue-shaped"},
    {name:"Servais Pinckaers",area:"virtue",position:"Sources of Christian Ethics (1985) — recovery of virtue and beatitude"},
    {name:"Oliver O'Donovan",area:"evangelical",position:"Resurrection and Moral Order — ethics rooted in created order"},
    {name:"Joseph Fletcher",area:"agape-only",position:"Situation ethics — agape as sole principle"},
    {name:"Pope Francis",area:"pastoral",position:"Amoris Laetitia (2016) — pastoral discernment within tradition"},
    {name:"Kevin Vanhoozer",area:"narrative",position:"The Drama of Doctrine — scripture-tradition-reason as theological performance"},
    {name:"Karl Rahner",area:"Catholic",position:"Foundations of Christian Faith — transcendental Catholic ethics"},
    {name:"Anders Nygren",area:"agape",position:"Agape and Eros — Christian distinctive love"}
  ],
  "Bonhoeffer": [
    {name:"Eberhard Bethge",area:"biographer",position:"Bonhoeffer's friend and biographer; editor of Letters and Papers from Prison"},
    {name:"Karl Barth",area:"influence",position:"Influence on Bonhoeffer; Barmen Declaration co-author"},
    {name:"Reinhold Niebuhr",area:"American",position:"Friend; shared Christian realism in politics"},
    {name:"Stanley Hauerwas",area:"pacifist response",position:"Respects Bonhoeffer but rejects assassination conclusion"},
    {name:"John Howard Yoder",area:"pacifist alternative",position:"The Politics of Jesus (1972) — pacifist alternative to Bonhoeffer's tragic realism"},
    {name:"Rowan Williams",area:"contemporary",position:"Defends Bonhoeffer's tragic realism in modern political theology"},
    {name:"Larry Rasmussen",area:"American Bonhoeffer",position:"Dietrich Bonhoeffer: His Significance for North Americans"},
    {name:"Charles Marsh",area:"biographer",position:"Strange Glory (2014) — definitive recent biography"},
    {name:"Sabine Dramm",area:"German scholar",position:"German Bonhoeffer scholarship on resistance and theology"},
    {name:"Clifford Green",area:"editor",position:"General editor of Bonhoeffer Works in English; theological interpretation"}
  ],
  "Religious Pluralism (Theology)": [
    {name:"Karl Rahner",area:"inclusivism",position:"Anonymous Christians; supernatural existential"},
    {name:"John Hick",area:"pluralism",position:"An Interpretation of Religion (1989) — pluralist hypothesis"},
    {name:"Gavin D'Costa",area:"typology",position:"Theology and Religious Pluralism — typology and critique"},
    {name:"Paul Knitter",area:"pluralism",position:"No Other Name? (1985) — pluralist liberation theology"},
    {name:"Hendrik Kraemer",area:"exclusivism",position:"The Christian Message in a Non-Christian World (1938) — revelational exclusivism"},
    {name:"S. Mark Heim",area:"different ends",position:"Salvations (1995) — different religions aim at different ultimate ends"},
    {name:"Raimon Panikkar",area:"cosmotheandric",position:"The Unknown Christ of Hinduism — Christ in all traditions"},
    {name:"Alan Race",area:"typology",position:"Coined threefold typology (exclusivism/inclusivism/pluralism) in 1983"},
    {name:"Jacques Dupuis",area:"Catholic pluralism",position:"Toward a Christian Theology of Religious Pluralism — Catholic inclusivism+"},
    {name:"Diana Eck",area:"comparative",position:"Encountering God — comparative religion within Christian framework"}
  ],
  "Religious Pluralism (Society)": [
    {name:"Lesslie Newbigin",area:"missiology",position:"The Gospel in a Pluralist Society (1989) — confessional witness in pluralist context"},
    {name:"David Ford",area:"Scriptural Reasoning",position:"The Future of Christian Theology (2011) — SR practice"},
    {name:"Peter Ochs",area:"Jewish co-founder",position:"Co-founder of Scriptural Reasoning; Jewish theologian"},
    {name:"Tariq Ramadan",area:"Muslim engagement",position:"Western Muslims and the Future of Islam — engagement, not assimilation"},
    {name:"Rowan Williams",area:"Anglican",position:"Faith in the Public Square — Christian voice in pluralist society"},
    {name:"Charles Taylor",area:"secularity",position:"A Secular Age — conditions of belief in modern pluralism"},
    {name:"Diana Eck",area:"American",position:"A New Religious America — founder of Pluralism Project at Harvard"},
    {name:"José Casanova",area:"sociological",position:"Public Religions in the Modern World — religion's de-privatisation"},
    {name:"Basit Koshul",area:"Muslim SR",position:"Muslim partner in Scriptural Reasoning practice"},
    {name:"Catherine Cornille",area:"Catholic interfaith",position:"The Im-Possibility of Interreligious Dialogue"}
  ],
  "Gender and Society": [
    {name:"Pope John Paul II",area:"complementarity",position:"Mulieris Dignitatem (1988) — feminine genius; complementarity"},
    {name:"Sarah Coakley",area:"contemplative",position:"God, Sexuality and the Self — contemplative theology with feminist insight"},
    {name:"Tina Beattie",area:"Catholic feminist",position:"New Catholic Feminism — critique of JP2's theology of the body"},
    {name:"Rebecca Groothuis",area:"egalitarian",position:"Good News for Women — evangelical egalitarian position"},
    {name:"Wayne Grudem",area:"complementarian",position:"Evangelical Feminism and Biblical Truth — leading complementarian"},
    {name:"Phyllis Trible",area:"texts of terror",position:"God and the Rhetoric of Sexuality; Texts of Terror — feminist biblical criticism"},
    {name:"Judith Butler",area:"gender theorist",position:"Gender Trouble (1990) — performativity; gender as constructed"},
    {name:"Simone de Beauvoir",area:"foundational",position:"The Second Sex (1949) — foundational text of modern feminism"},
    {name:"Catharine MacKinnon",area:"radical feminist",position:"Toward a Feminist Theory of the State"},
    {name:"Carter Heyward",area:"Episcopal feminist",position:"Touching Our Strength — feminist erotic theology"}
  ],
  "Gender and Theology": [
    {name:"Rosemary Radford Ruether",area:"reform",position:"Sexism and God-Talk (1983) — reform-from-within feminism"},
    {name:"Mary Daly",area:"post-Christian",position:"Beyond God the Father (1973); Gyn/Ecology — post-Christian rejection"},
    {name:"Elizabeth Johnson",area:"Catholic feminist",position:"She Who Is (1992) — Wisdom-tradition feminine God-language"},
    {name:"Sallie McFague",area:"metaphor",position:"Models of God (1987) — Mother, Lover, Friend"},
    {name:"Phyllis Trible",area:"biblical",position:"Texts of Terror (1984) — depatriarchalising biblical interpretation"},
    {name:"Daphne Hampson",area:"post-Christian",position:"Theology and Feminism (1990); After Christianity — post-Christian position"},
    {name:"Kwok Pui-lan",area:"postcolonial",position:"Postcolonial Imagination and Feminist Theology — intersectional critique"},
    {name:"Sarah Coakley",area:"kenotic",position:"Powers and Submissions (2002) — kenotic feminism reclaiming 'submission'"},
    {name:"Letty Russell",area:"liberation feminist",position:"Church in the Round — feminist ecclesiology"},
    {name:"Ada María Isasi-Díaz",area:"mujerista",position:"Mujerista Theology — Latina feminist theology"}
  ],
  "Secularism": [
    {name:"Sigmund Freud",area:"reduction",position:"The Future of an Illusion (1927); Civilization and Its Discontents (1930)"},
    {name:"Richard Dawkins",area:"new atheism",position:"The God Delusion (2006) — religion as harmful delusion"},
    {name:"Christopher Hitchens",area:"new atheism",position:"God Is Not Great (2007) — 'religion poisons everything'"},
    {name:"Sam Harris",area:"new atheism",position:"The End of Faith (2004) — religion as intellectual and moral failure"},
    {name:"Daniel Dennett",area:"new atheism",position:"Breaking the Spell (2006) — naturalistic explanation of religion"},
    {name:"Charles Taylor",area:"sociology",position:"A Secular Age (2007) — 'immanent frame'; conditions of modern unbelief"},
    {name:"Alister McGrath",area:"response",position:"The Twilight of Atheism; Dawkins' God — leading evangelical responder"},
    {name:"David Bentley Hart",area:"response",position:"Atheist Delusions (2009) — historical critique of New Atheist claims"},
    {name:"Terry Eagleton",area:"response",position:"Reason, Faith, and Revolution (2009) — 'Tintin in the Congo' critique"},
    {name:"John Gray",area:"sceptic of new atheism",position:"Seven Types of Atheism (2018) — secular humanism as Christianity's residue"}
  ],
  "Liberation Theology and Marx": [
    {name:"Gustavo Gutiérrez",area:"founder",position:"A Theology of Liberation (1971/1988) — founding text"},
    {name:"Leonardo Boff",area:"Brazilian",position:"Jesus Christ Liberator (1972); Church: Charism and Power (1981)"},
    {name:"Jon Sobrino",area:"Salvadoran",position:"Christology at the Crossroads — liberation Christology"},
    {name:"Joseph Ratzinger",area:"Vatican critique",position:"Instruction on Certain Aspects of the Theology of Liberation (1984)"},
    {name:"Pope Francis",area:"rehabilitation",position:"Evangelii Gaudium (2013) — mainstreaming preferential option"},
    {name:"James Cone",area:"Black",position:"A Black Theology of Liberation (1970) — American Black liberation theology"},
    {name:"Camilo Torres",area:"revolutionary",position:"Colombian priest who joined ELN guerrillas; killed 1966"},
    {name:"Óscar Romero",area:"martyr",position:"Archbishop of San Salvador; martyred 1980; canonised 2018"},
    {name:"Michael Novak",area:"conservative critic",position:"The Spirit of Democratic Capitalism (1982) — critique of liberation economics"},
    {name:"Juan Luis Segundo",area:"hermeneutics",position:"Liberation of Theology — hermeneutical circle"},
    {name:"Michael Löwy",area:"Marxist critic",position:"The War of Gods — argues liberation theology too theological, not Marxist enough"}
  ]
};

/* OCR H573 — Essay plans and sample answers.
   For each major topic: thesis line, paragraph-by-paragraph plan with key scholars,
   counter-arguments, and conclusion guidance.
   Plans with examMarks are calibrated against real examiner marks. */
const ESSAY_PLANS = [
  /* =========================================================================
     PAPER 01 — PHILOSOPHY OF RELIGION
     ========================================================================= */
  /* --- Ancient Philosophical Influences --- */
  { id:"plato-reality", paper:"01", topic:"Ancient Philosophical Influences",
    question:"'Plato's view of reality is more convincing than Aristotle's.' Discuss. [40]",
    thesis:"Aristotle wins the methodological battle, but Plato wins the metaphysical one. Aristotle's empiricism is more disciplined, but his Prime Mover is too thin to sustain religious commitment; Plato's Form of the Good retains the normative weight any recognisable monotheism requires.",
    paragraphs:[
      { topic:"Plato's Theory of Forms and the Form of the Good", scholars:["Plato (Republic VI-VII)","Cave Analogy"], argument:"Reality consists of perfect, immaterial Forms; the Form of the Good illuminates all others as the sun illuminates objects. Knowledge is of Forms; opinion is of appearances.", counter:"Aristotle's Third Man Argument — if particulars resemble the Form, a further Form must explain that resemblance; entities multiply without explanatory gain.", response:"Plato's Forms still capture the universal-particular relation in a way Aristotle's immanent forms struggle to ground normatively." },
      { topic:"Aristotle's Four Causes and Prime Mover", scholars:["Aristotle (Metaphysics, Physics)"], argument:"Forms are IN things, not in a separate realm. The Four Causes (material, formal, efficient, final) explain change. The Prime Mover is pure actuality, unmoved, the object of cosmic desire.", counter:"The Prime Mover is impersonal, indifferent, contemplating only itself — not worship-worthy in any biblical sense.", response:"Aquinas later Christianises Aristotle's framework, showing it can be deployed theologically." },
      { topic:"Rationalism vs empiricism", scholars:["Plato (rationalist)","Aristotle (empiricist)","Aquinas (synthesis)"], argument:"Plato's over-trust in reason produces a realm we cannot verify; Aristotle's over-trust in the senses cannot explain mathematics or moral truths.", counter:"Modern philosophy of religion has largely sided with empiricism (Hume, Russell).", response:"A serious philosopher of religion needs both: Plato for transcendence, Aristotle for immanence. Aquinas synthesises." }
    ],
    conclusion:"Plato wins on metaphysical depth (the Form of the Good); Aristotle wins on method (disciplined empiricism). The synthesis Christianity needed arrived with Aquinas, who used Aristotle's method to reach a Platonic God." },

  { id:"forms-convincing", paper:"01", topic:"Ancient Philosophical Influences",
    question:"Critically assess Plato's Theory of the Forms. [40]",
    thesis:"The Theory of Forms captures something real about universals and grounds the Form of the Good as a normative anchor, but Aristotle's Third Man objection exposes a fatal regress that no Platonist has adequately answered.",
    paragraphs:[
      { topic:"What the Forms claim", scholars:["Plato","Cave Analogy"], argument:"Particulars participate in eternal, immaterial Forms; reality proper is the realm of Forms, not the sensible world.", counter:"The 'participation' relation is never clearly specified.", response:"Even unclear, the theory explains why universals like 'beauty' apply across diverse particulars." },
      { topic:"Aristotle's Third Man", scholars:["Aristotle"], argument:"If a particular man is a man by participating in the Form of Man, then the Form of Man and a particular man must share something — requiring a further Form (the Third Man), and so on infinitely.", counter:"Plato could respond that Forms are sui generis and the regress doesn't apply.", response:"This makes 'participation' a black box; the theory loses explanatory power." },
      { topic:"The Form of the Good", scholars:["Plato","Iris Murdoch (sympathetic modern reader)"], argument:"The Good is the supreme Form; it grounds moral and metaphysical unity. Modern philosophers like Murdoch find this attractive against modern moral nihilism.", counter:"Russell and Nietzsche reject Platonic moral realism as wishful.", response:"But moral realism has resources beyond Plato; the Form of the Good points to something whether or not Plato's specific metaphysics holds." }
    ],
    conclusion:"The Theory of Forms is metaphysically powerful but logically fragile. The Form of the Good survives as an idea even if the broader theory does not. Aquinas' analogical realism preserves the insight without the regress." },

  { id:"prime-mover", paper:"01", topic:"Ancient Philosophical Influences",
    question:"'Aristotle's Prime Mover provides a convincing explanation of the universe.' Discuss. [40]",
    thesis:"The Prime Mover succeeds as cosmic explanation but fails as God. It grounds causation but lacks the personal attributes any worship-worthy deity must possess; Aquinas' Christianisation is therefore needed, not Aristotle's original.",
    paragraphs:[
      { topic:"The argument for the Prime Mover", scholars:["Aristotle (Metaphysics Lambda)"], argument:"Change requires actualisation of potential. Infinite regress of movers is impossible. Therefore a Prime Mover — pure actuality, immaterial, unchanging — exists. It moves things by being the object of cosmic desire.", counter:"Why must regress be impossible? Modern physics permits infinite regresses.", response:"Aristotle's argument is metaphysical, not physical; it concerns the dependence of contingent change on a non-contingent ground." },
      { topic:"Strengths of the explanation", scholars:["Aquinas (First Way)"], argument:"Empirically grounded (starts from observed change); avoids Plato's separate realm; explains cosmic order; can be Christianised by Aquinas.", counter:"The Prime Mover only contemplates itself — it doesn't act on the world.", response:"Action through final causation (object of desire) is a coherent kind of agency, even if non-interventionist." },
      { topic:"Failures as God", scholars:["Aristotle's deity vs God of Abraham","Aquinas (Christianisation)"], argument:"The Prime Mover doesn't know creatures, love them, or intervene. It is not worship-worthy in any recognisable religious sense.", counter:"Deists argue this is precisely the right kind of God — non-interventionist.", response:"But deism is theologically thin; any religion with prayer, revelation, or redemption requires more. Aquinas adds these via the Five Ways and analogy." }
    ],
    conclusion:"Aristotle's Prime Mover succeeds as the abstract first cause but fails as the personal God. The convincing version is Aquinas' — empirical method (Aristotle) reaching a personal, loving God (revelation). Aristotle alone gives only deism." },

  /* --- Soul, Mind and Body --- */
  { id:"soul-metaphor", paper:"01", topic:"Soul, Mind and Body",
    question:"'The concept of the soul is best understood metaphorically.' Discuss. [40]",
    thesis:"Descartes' dualism is indefensible and crude materialism cannot explain consciousness, so Aristotle's hylomorphism — soul as the form of the living body — is the only view standing. This is neither fully metaphorical nor naively literal.",
    paragraphs:[
      { topic:"Substance dualism fails", scholars:["Descartes","Ryle (ghost in the machine)","Elisabeth of Bohemia"], argument:"Descartes' res cogitans vs res extensa cannot explain how an immaterial mind interacts with a physical body. Brain damage changes personality — why if the soul is immaterial?", counter:"Modern dualists like Swinburne defend property dualism.", response:"Property dualism is closer to hylomorphism; it concedes the failure of substance dualism." },
      { topic:"Materialism cannot reduce consciousness", scholars:["Dawkins","Jackson (Mary's room)","Nagel (bat)"], argument:"Frank Jackson's Mary knows every physical fact about red but learns something when she sees it. Nagel: physical data doesn't tell us what it's like to be a bat. Qualia resist reduction.", counter:"Dennett: consciousness is a useful illusion produced by parallel cognitive processes.", response:"Dennett's eliminativism is too costly — denies the very phenomenon to be explained." },
      { topic:"Aristotle's hylomorphism survives", scholars:["Aristotle (De Anima)","Aquinas"], argument:"Soul is the form of the living body — what the body does. Not separable but not reducible. Avoids interaction problem AND eliminativism.", counter:"Doesn't this make the soul ultimately mortal?", response:"For Aquinas, resurrection of the body (not immortality of the soul) is the Christian doctrine; hylomorphism fits this better than Platonic dualism does." }
    ],
    conclusion:"The soul is best understood neither as a literal substance nor as a mere metaphor, but as Aristotle's form of the living body. This preserves what is real about mental life without positing a ghost, and lets Christian theology speak of resurrection without incoherence." },

  { id:"dualism-vs-materialism", paper:"01", topic:"Soul, Mind and Body",
    question:"'Materialism cannot give a full account of the human person.' Discuss. [40]",
    thesis:"Materialism cannot account for qualia or first-person consciousness without massive eliminativism, but substance dualism is equally untenable. The middle position — non-reductive physicalism, close to Aristotelian hylomorphism — is the only defensible view.",
    paragraphs:[
      { topic:"The qualia argument", scholars:["Jackson","Nagel","Chalmers (hard problem)"], argument:"Mary the colour scientist; what is it like to be a bat; the hard problem of consciousness. Subjective experience is not captured by physical data.", counter:"Dennett: this is conceptual confusion; consciousness is parallel processing.", response:"Eliminating consciousness to save materialism explains nothing." },
      { topic:"Substance dualism is no answer", scholars:["Descartes","Ryle"], argument:"If consciousness is genuinely non-physical, how does it interact with neurons? Interaction problem is fatal.", counter:"Property dualism — mental properties supervene on physical without being reducible.", response:"This is close to hylomorphism, not Descartes' substance dualism." },
      { topic:"Non-reductive physicalism", scholars:["Aristotle","Putnam (functionalism)"], argument:"Mental states are real, not reducible to physical states, but instantiated by physical substrates. Like software running on hardware.", counter:"Doesn't explain consciousness specifically.", response:"It doesn't claim to — it leaves consciousness as a genuine puzzle while preserving the unity of the person." }
    ],
    conclusion:"Materialism in its eliminativist form cannot account for the person; in its non-reductive form, it converges on Aristotelian hylomorphism. Either way, the lesson is the same: the soul is neither a ghost nor an illusion." },

  { id:"descartes-dualism", paper:"01", topic:"Soul, Mind and Body",
    question:"Critically assess Descartes' substance dualism. [40]",
    thesis:"Descartes' dualism is creative and historically important but indefensible — Elisabeth's interaction objection has never been adequately answered, and modern neuroscience compounds the difficulty. Hylomorphism succeeds where dualism fails.",
    paragraphs:[
      { topic:"The cogito and the real distinction", scholars:["Descartes (Meditations)"], argument:"I can doubt my body but not the doubting itself. Mind (res cogitans) and body (res extensa) have different essential properties, therefore are distinct substances.", counter:"The fact that I can conceive them separately doesn't prove they ARE separate (modal fallacy).", response:"Descartes can argue from clear and distinct perception, but this requires his theistic guarantee, which assumes what's to be proved." },
      { topic:"The interaction problem", scholars:["Elisabeth of Bohemia","Modern neuroscience"], argument:"How does immaterial mind move physical body? Descartes gestured at the pineal gland; no genuine explanation.", counter:"We don't fully understand causation anyway — gravity is mysterious too.", response:"But gravity is mathematically describable; cross-substance causation is not even in principle." },
      { topic:"Neuroscientific evidence against", scholars:["Phineas Gage","Modern neuroimaging"], argument:"Brain damage changes personality, memory, moral judgement. If these were housed in an immaterial soul, why would physical damage affect them?", counter:"The brain might be the soul's interface with the body, like a radio receiver.", response:"This stretches the theory beyond plausibility — every fact of neuroscience would be coincidental." }
    ],
    conclusion:"Substance dualism fails. Aristotle's hylomorphism — soul as form of body — explains everything dualism tries to without the interaction problem. Descartes was creative but wrong; the philosophy of mind has moved on." },

  /* --- Arguments from Observation --- */
  { id:"teleological-survives", paper:"01", topic:"Arguments from Observation",
    question:"'The teleological argument is no longer credible.' Discuss. [40]",
    thesis:"Paley's biological design argument is dead; Darwin killed it. But fine-tuning — the design argument from physical constants — is alive, and modern theistic philosophers like Swinburne have given it new force. The argument survives in a modified form.",
    paragraphs:[
      { topic:"Paley's argument and Darwin's response", scholars:["Paley (watchmaker)","Darwin","Dawkins (blind watchmaker)"], argument:"Paley: complex purposive arrangement implies a designer. Darwin: natural selection produces the same effect without one.", counter:"Behe's irreducible complexity (Darwin's Black Box).", response:"Behe's specific examples have been refuted in detail; intelligent design is scientifically marginal." },
      { topic:"Hume's prior critique", scholars:["Hume (Dialogues)"], argument:"Universe-machine analogy is weak (universe is more like an organism). We have no experience of universe-creation. Even granted a designer, why one, why benevolent?", counter:"These objections weaken the conclusion but don't refute it.", response:"They reduce the argument from proof to inference to the best explanation, which is what Swinburne now claims." },
      { topic:"Fine-tuning revives the argument", scholars:["Swinburne","Collins (Bayesian fine-tuning)"], argument:"Physical constants (gravitational, electromagnetic) lie in extraordinarily narrow life-permitting ranges. Either brute fact, multiverse, or design. Design is a serious option.", counter:"Multiverse hypothesis explains fine-tuning without God.", response:"But positing infinite unobservable universes is hardly more parsimonious than positing a designer; both go beyond evidence." }
    ],
    conclusion:"The teleological argument is no longer credible in its Paleyan form, but fine-tuning gives it new credibility. It does not prove God; it keeps theism a rational option — enough to frustrate confident atheism." },

  { id:"cosmological-aquinas", paper:"01", topic:"Arguments from Observation",
    question:"Critically assess Aquinas' cosmological argument. [40]",
    thesis:"Aquinas' first three Ways establish the rationality of theism but do not prove the Christian God. Russell's brute-fact response is symmetrically available to the theist, leaving the argument as a genuine inference but not a deduction.",
    paragraphs:[
      { topic:"The first three Ways", scholars:["Aquinas (Summa Theologiae I.2.3)"], argument:"Motion: things move only when moved; infinite regress impossible; therefore First Unmoved Mover. Causation: nothing causes itself; therefore First Uncaused Cause. Contingency: contingent things might not exist; if everything were contingent, nothing would now exist; therefore necessary being.", counter:"Why is infinite regress impossible? Modern cosmology allows it.", response:"Aquinas' regress argument is about ontological dependence, not temporal sequence." },
      { topic:"Hume and Russell respond", scholars:["Hume","Russell (Copleston debate 1948)"], argument:"Hume: no experience of universe-creation; cannot reason analogically. Russell: 'the universe is just there, and that's all.'", counter:"Aquinas relies on the Principle of Sufficient Reason — every contingent fact has an explanation.", response:"PSR is a metaphysical posit; rejecting it is coherent if costly." },
      { topic:"The leap from First Cause to God", scholars:["Hume","Aquinas (cumulative Ways)"], argument:"Even granted a First Cause, it need not be personal, loving, or unique. Hume: limited, multiple, dead designer possibilities.", counter:"Aquinas: the Five Ways combined point to a specific being.", response:"Still does not yield the Christian God specifically; revelation is required to bridge the gap." }
    ],
    conclusion:"Aquinas' cosmological argument establishes that the universe demands explanation and that 'brute fact' is no more economical than 'necessary being'. It does not prove God; it keeps theism rational." },

  { id:"evolution-design", paper:"01", topic:"Arguments from Observation",
    question:"'Evolution destroys the design argument.' Discuss. [40]",
    thesis:"Evolution destroys Paley's specific argument from biological complexity but leaves the broader design argument intact. Fine-tuning of physical constants is unaffected by natural selection, and even biological evolution itself can be read as a fine-tuned process.",
    paragraphs:[
      { topic:"How evolution undermines Paley", scholars:["Darwin","Dawkins (The Blind Watchmaker)"], argument:"Natural selection produces apparent design without a designer. The eye, the heart, the complexity Paley invoked — all explicable mechanistically.", counter:"Behe: irreducibly complex structures (bacterial flagellum) cannot evolve gradually.", response:"Mainstream biology has refuted Behe's specific examples; intelligent design is not science." },
      { topic:"Fine-tuning survives evolution", scholars:["Swinburne","Collins"], argument:"Cosmological constants (gravitational, electromagnetic, cosmological) had to be precisely set BEFORE biology could happen. Evolution presupposes a life-permitting universe.", counter:"Multiverse: infinite universes, ours happens to be life-permitting.", response:"Multiverse is unobservable and unfalsifiable; it explains everything by positing everything." },
      { topic:"Evolution itself as designed?", scholars:["Polkinghorne","Conway Morris (evolutionary convergence)"], argument:"Evolution might be a designed PROCESS — the laws and starting conditions guarantee complex life. Conway Morris: convergence suggests inevitability.", counter:"This is theology dressed as science.", response:"It's at least no worse than atheist counter-claims; both go beyond evidence." }
    ],
    conclusion:"Evolution destroys Paley's argument but not the design argument as such. Fine-tuning of constants and the law-governed character of evolution itself remain open to design inference. The argument has retreated, not died." },

  /* --- Arguments from Reason --- */
  { id:"ontological-attributes", paper:"01", topic:"Arguments from Reason",
    question:"'It is impossible to argue for the existence of God from his attributes.' Discuss. [40]",
    thesis:"We cannot derive God's existence from his definition because (a) the predicate 'existence' is contested, (b) the subject 'God' is not fully knowable, and (c) doing so would collapse the 'epistemological space' (Hick) on which meaningful faith depends.",
    paragraphs:[
      { topic:"The ontological argument's a priori structure", scholars:["Anselm: Proslogion 2","Anselm: Proslogion 3 (necessary existence)"], argument:"Anselm argues God is de dicto necessary — necessary through language. To deny God's existence is contradictory because existence in reality is greater than existence in the mind alone.", counter:"Gaunilo: by the same logic, the most perfect island must exist. Reductio.", response:"Anselm replies the argument applies only to God: an island is contingent by definition (dynamic landform), so the parody fails. Descartes supports: necessary existence belongs to God's essence." },
      { topic:"Kant's critique: existence is not a predicate", scholars:["Kant","Descartes (the target of Kant)","Frege & Russell (modern formulation)"], argument:"Kant rejects Descartes' formulation that a supremely perfect being must have the perfection of existence. Existence adds nothing to the concept — a hundred real thalers are no richer than a hundred imagined.", counter:"Norman Malcolm / Plantinga: necessary existence (Proslogion 3) IS a predicate.", response:"Even the modal argument's premise ('a necessary being is possible') is what the atheist denies; question-begging in practice." },
      { topic:"The epistemological space", scholars:["John Hick","1 Corinthians 13","D.Z. Phillips"], argument:"If God's existence could be derived from his definition, faith would be redundant. Hick: God leaves an 'epistemological space' for genuine relationship through faith.", counter:"Some theologians argue we can know God through revelation without compromising faith.", response:"Self-limitation of God's attributes preserves faith; arguing from attributes destroys what makes the relationship meaningful." }
    ],
    conclusion:"We cannot derive God's existence from his definition. The problematic logic, the contested nature of 'existence' as predicate, and the destruction of epistemological space all converge. D.Z. Phillips' deeper point: theology takes God as its starting axiom, as mathematics takes its.",
    examMarks:"AO1 L6 (14/16) + AO2 L5 (21/24) = 35/40 (Grade A)",
    examinerNotes:"Strong opening thesis. Good engagement with Gaunilo and Kant. Loses AO2 L6 by not unpacking 'attributes' and 'predicate' fully enough. Concluding paragraph slightly weak — needs to return more sharply to the question." },

  { id:"anselm-justifies-belief", paper:"01", topic:"Arguments from Reason",
    question:"'Anselm's Ontological Argument justifies a belief in God.' Discuss. [40]",
    thesis:"Anselm's ontological argument fails to justify belief in God. While Gaunilo's parody fails, Kant's objection that existence is not a predicate is decisive, and Hick's distinction between logical and ontological necessity finishes the job.",
    paragraphs:[
      { topic:"Strengths of Anselm's approach", scholars:["Anselm (Proslogion 2 and 3)","Psalm 14:1","Plato (rationalist epistemology)"], argument:"God is 'that than which nothing greater can be conceived'. Existence in reality is greater than in the mind alone. Therefore God exists in reality. Proslogion 3 strengthens: necessary existence is greater than contingent.", counter:"Empiricists reject a priori reasoning about existence.", response:"Plato supports: knowledge comes through reason, not the senses, so a priori reasoning about ultimate reality is legitimate." },
      { topic:"Gaunilo's lost island fails", scholars:["Gaunilo","Anselm's reply","Descartes","Plantinga (intrinsic maximum)"], argument:"Gaunilo: by Anselm's logic, the most perfect island must exist. Reductio.", counter:"Anselm: applies only to God. Descartes: God's essence includes necessary existence; islands' don't.", response:"An island is contingent by definition — dynamic landform. Gaunilo commits a straw man. Plantinga: greatness admits an intrinsic maximum only for God." },
      { topic:"Kant succeeds where Gaunilo fails", scholars:["Kant","Malcolm","Hick (logical vs ontological necessity)"], argument:"Kant: a triangle necessarily has three sides only IF it exists. Similarly, God necessarily exists only if God actually exists.", counter:"Malcolm: a necessary being must exist by definition.", response:"Hick: Malcolm confuses logical and ontological necessity. Non-contingent only means self-explaining IF real — not that God must be real." }
    ],
    conclusion:"Anselm's ontological argument does not justify belief in God. Kant's rebuttal that necessity does not imply existence is effective, making the argument ultimately unjustified.",
    examMarks:"AO1 L6 (16/16) + AO2 L5 (20/24) = 36/40" },

  { id:"existence-predicate", paper:"01", topic:"Arguments from Reason",
    question:"'Existence is a predicate.' Discuss. [40]",
    thesis:"Standard existence is not a predicate (Kant is right) but necessary existence might be (Malcolm/Plantinga's modal rescue). This saves the ontological argument's validity but at the cost of a premise no atheist will grant — making it valid but unpersuasive.",
    paragraphs:[
      { topic:"Kant's argument", scholars:["Kant (Critique of Pure Reason)","Anselm (Proslogion 2)"], argument:"Existence adds nothing to the concept of a thing — a real €100 and an imagined €100 are conceptually identical. Predicates describe what a thing IS; existence says THAT it is.", counter:"But surely there's a difference between fictional and real entities.", response:"There is — but not at the level of concept. The difference is in instantiation, which Frege treats as second-order." },
      { topic:"Frege and Russell's formalisation", scholars:["Frege","Russell"], argument:"'Existence' is a second-order property — a feature of concepts (they are instantiated), not of objects. To say 'horses exist' is to say 'the concept HORSE has instances.'", counter:"Modal logic treats existence as a predicate over possible worlds.", response:"That's necessary existence, not existence simpliciter — and necessary existence is contestable." },
      { topic:"Malcolm and Plantinga's modal argument", scholars:["Malcolm","Plantinga","Hick"], argument:"If a necessary being is POSSIBLE, then it exists in some possible world; but a necessary being existing in one world exists in all; therefore it exists.", counter:"The argument is question-begging: 'is a necessary being possible' is what we want to know.", response:"Hick: confuses logical (definitional) and ontological (mind-independent) necessity. Mere logical possibility doesn't entail ontological existence." }
    ],
    conclusion:"Existence is not a first-order predicate; Kant is right. Necessary existence might be, but the modal argument's persuasive premise (necessary being is possible) is precisely what the atheist denies. The argument is valid but unpersuasive — a brilliant formal exercise, not a proof of God." },

  /* --- Religious Experience --- */
  { id:"experience-evidence", paper:"01", topic:"Religious Experience",
    question:"'Religious experience provides a basis for belief in God.' Discuss. [40]",
    thesis:"Religious experience is rationally respectable but evidentially modest: it can ground the believer through Swinburne's principles of credulity and testimony, but it cannot convert the sceptic because of cross-cultural variation.",
    paragraphs:[
      { topic:"Swinburne's defence", scholars:["Swinburne (credulity and testimony)","William James"], argument:"Principle of credulity: if it seems X is present, probably X is present. Principle of testimony: believe others' experiences. These give religious experience prima facie evidential weight.", counter:"Strong in everyday contexts; weaker when metaphysical claims are at stake.", response:"James pragmatically argues we judge by fruits — transformed lives count." },
      { topic:"Cross-cultural problem", scholars:["Steven Katz (constructivism)","Hick (pluralism)"], argument:"If experiences track culture (Catholics see Mary; Hindus don't), they cannot evidence any specific religion's truth.", counter:"Hick: all encounter the same transcendent Real filtered through cultural schemas.", response:"This saves evidential value at the cost of orthodoxy. But it's a coherent meta-position." },
      { topic:"Naturalistic explanations overreach", scholars:["Freud (wish-fulfilment)","Persinger (temporal lobe)","Otto (numinous)"], argument:"Wish-fulfilment, temporal lobe stimulation, drugs can all produce phenomenologically similar experiences.", counter:"Otto: the numinous is qualitatively distinct.", response:"Even if so, the mechanism doesn't settle whether the experience has external referents — neurology of vision doesn't tell us whether trees exist." }
    ],
    conclusion:"Religious experience grounds the believer but cannot convert the sceptic. Swinburne's principles give it defeasible evidential weight; cross-cultural variation limits how specific that evidence can be. This is honest, not defeat." },

  { id:"james-mysticism", paper:"01", topic:"Religious Experience",
    question:"'James' four marks of mystical experience are unconvincing.' Discuss. [40]",
    thesis:"James' four marks (ineffability, noetic quality, transience, passivity) accurately describe the phenomenology of mystical experience but do not establish its veridicality. They are descriptive, not evidential — useful but limited.",
    paragraphs:[
      { topic:"James' four marks", scholars:["William James (Varieties of Religious Experience)"], argument:"Ineffability: defies description. Noetic: gives knowledge, not just feeling. Transience: short-lived. Passivity: one feels acted upon. Together identify a phenomenon.", counter:"Ineffability is also a feature of LSD trips and sensory deprivation.", response:"James' point is identification, not justification — he is mapping the territory." },
      { topic:"Strengths: pragmatic approach", scholars:["James","Otto"], argument:"James: judge by fruits — transformed lives evidence authenticity. Otto's mysterium tremendum captures the noetic quality. Cross-cultural consistency in mystical reports supports James.", counter:"Naturalistic mechanisms (Persinger) reproduce the phenomenology.", response:"James acknowledges this; his claim is about the lived reality, not the metaphysics." },
      { topic:"Limitations", scholars:["Katz (constructivism)","Freud","Stace"], argument:"Katz: experiences are culturally constructed; there is no pure mysticism. Freud: wish-fulfilment. Stace distinguishes extrovertive from introvertive, complicating James' unity.", counter:"These critiques presuppose the absence of the divine.", response:"They show James' marks cannot prove a referent — only describe a phenomenon." }
    ],
    conclusion:"James' four marks are convincing as description but not as evidence. They map mystical experience without settling whether it has an external object. Their descriptive utility survives; their evidential weight remains contested." },

  { id:"corporate-individual", paper:"01", topic:"Religious Experience",
    question:"'Corporate religious experiences are more reliable than individual ones.' Discuss. [40]",
    thesis:"Corporate experiences are harder to dismiss as individual pathology but invite the alternative pathology of mass suggestion. Neither is decisively more reliable; both have evidential weight as defeasible testimony but neither can prove God.",
    paragraphs:[
      { topic:"The corporate case", scholars:["Pentecost (Acts 2)","Marian apparitions (Fatima 1917)","Toronto Blessing"], argument:"Multiple witnesses report the same experience independently. Pentecost: speaking in tongues observed by thousands. Fatima: 70,000 reported sun phenomena.", counter:"Mass suggestion, expectancy effects, and group dynamics produce shared 'experiences' (Salem witch trials).", response:"But systematic discrediting of every corporate case looks ad hoc; some warrant serious investigation." },
      { topic:"Individual experience", scholars:["Teresa of Avila","William James","Otto"], argument:"Individual mystical experience has been the foundation of major religious traditions. Teresa's interior castle, Augustine's conversion, Mohammed in the cave.", counter:"Individuals are subject to delusion, drugs, neurological states.", response:"Swinburne's testimony principle treats individual testimony as defeasible evidence, not proof." },
      { topic:"Methodological problem", scholars:["Hume","Mackie"], argument:"Hume: it is always more probable that witnesses were mistaken than that a miracle occurred. Mackie: numerous independent witnesses can still all be wrong.", counter:"Witness convergence is real evidence in court and history.", response:"But religious experiences are unique — they are claimed to be about a unique entity, raising the prior probability against." }
    ],
    conclusion:"Corporate experiences have the advantage of numbers but the disadvantage of group dynamics; individual ones have the reverse. Both function as defeasible evidence within a faith community but neither can establish God to an outsider. Reliability is in the eye of the beholder." },

  /* --- Problem of Evil --- */
  { id:"evil-no-god", paper:"01", topic:"Problem of Evil",
    question:"'The existence of evil proves that there is no God.' Discuss. [40]",
    thesis:"Evil does not prove there is no God, but it makes the existence of the classical omni-God highly improbable. Theodicies fail to neutralise the evidential weight of gratuitous suffering; the honest theist concedes evil as mystery rather than solving it as puzzle.",
    paragraphs:[
      { topic:"The logical problem and Plantinga's response", scholars:["Mackie (inconsistent triad)","Plantinga (free-will defence)"], argument:"Mackie: omnipotence + omnibenevolence + evil cannot all be true. Plantinga: God could not create free creatures and guarantee they always choose good — the free-will defence resolves the logical contradiction.", counter:"What about natural evil? And free-will defence requires significant libertarian freedom.", response:"Plantinga's response succeeds against the logical problem; it does not answer the evidential one." },
      { topic:"Augustine and Hick's theodicies fail", scholars:["Augustine","Schleiermacher","Hick","D.Z. Phillips"], argument:"Augustine's theodicy requires literal Fall (untenable post-evolution). Hick's soul-making cannot explain gratuitous suffering, especially of children and animals.", counter:"Hick: universalism — all souls eventually reach God.", response:"But quantity and distribution of evil exceed any pedagogical need. D.Z. Phillips: offering this as soul-making tuition is monstrous." },
      { topic:"The evidential problem", scholars:["Rowe (fawn)","Wykstra (CORNEA)","Adams (horrendous evils)"], argument:"Rowe: gratuitous suffering — animal pain pre-humans, the Holocaust, childhood cancer — is not proportionate to any moral good we can name.", counter:"Wykstra: we may not be in a position to judge whether suffering is gratuitous.", response:"Sceptical theism saves theodicy but at the cost of paralysing moral judgement about what God is doing — too expensive." }
    ],
    conclusion:"Evil does not deductively prove there is no God — Plantinga answers the logical problem. But the evidential problem stands: gratuitous suffering is rationally inconsistent with the omni-God. The honest theist follows Job — refuses theodicies, holds the faith, accepts mystery." },

  { id:"augustine-theodicy", paper:"01", topic:"Problem of Evil",
    question:"Critically assess Augustine's theodicy. [40]",
    thesis:"Augustine's theodicy is theologically rich but biologically false and morally troubling. The literal Fall is untenable post-evolution, and Schleiermacher's objection that a perfect creation cannot produce corruption is decisive.",
    paragraphs:[
      { topic:"Augustine's account", scholars:["Augustine (Confessions, City of God)","Romans 5"], argument:"Evil is privation of good (privatio boni), not a thing in itself. It entered through misuse of free will at the Fall. Original sin transmitted biologically. Natural evil is punishment.", counter:"This depends on a literal Adam and Eve.", response:"Augustine treats Genesis 3 as historical; demythologising changes his theodicy substantially." },
      { topic:"Scientific and moral problems", scholars:["Modern evolutionary biology","Schleiermacher"], argument:"Evolution rules out a single human pair. Biological transmission of guilt through sex is morally obscene. Schleiermacher: a perfect creation cannot produce corruption without already containing the flaw — making God ultimately responsible.", counter:"Catholic theology demythologises (Rahner): Fall as mythic encoding of universal condition.", response:"But this changes Augustine's account; it doesn't defend it." },
      { topic:"What survives", scholars:["Niebuhr","Aquinas (grace perfects nature)"], argument:"Augustine's diagnosis of the will (incurvatus in se) — humans bent inward, unable to love rightly without grace — remains a powerful description of moral experience even without the literal Fall.", counter:"This is just generic moral pessimism, not specifically Augustinian.", response:"It captures something specific: the curvature of the will, not mere weakness — Pelagius' optimism is wrong." }
    ],
    conclusion:"Augustine's theodicy fails in its literal form. The Fall is biologically untenable, the transmission mechanism morally obscene, and Schleiermacher's objection decisive. Demythologised, it survives as psychological insight, not doctrine." },

  { id:"hick-soul-making", paper:"01", topic:"Problem of Evil",
    question:"'Hick's soul-making theodicy successfully answers the problem of evil.' Discuss. [40]",
    thesis:"Hick's theodicy is more humane than Augustine's but still fails on quantity, distribution, and animal suffering. D.Z. Phillips' objection — that offering suffering as soul-making tuition is morally monstrous — is fatal.",
    paragraphs:[
      { topic:"Hick's account", scholars:["Hick (Evil and the God of Love)","Irenaeus (image vs likeness)"], argument:"Humans are made in God's IMAGE but must grow into God's LIKENESS through moral struggle. A painless world would be a toy world; real virtues require real challenges. Universalism: all eventually reach God.", counter:"This requires us to believe enormous suffering is morally educational.", response:"Hick: the alternative is meaningless existence; epistemic distance from God enables genuine freedom." },
      { topic:"Quantity, distribution, animals", scholars:["Rowe (fawn)","D.Z. Phillips"], argument:"The quantity of suffering vastly exceeds any soul-making need. Children with cancer don't develop virtues; they die. Animals suffered for hundreds of millions of years before humans existed.", counter:"Hick: post-mortem soul-making continues; universalism eventually justifies.", response:"This pushes the problem rather than solving it. Animals' pre-human suffering remains unjustified." },
      { topic:"Phillips' moral critique", scholars:["D.Z. Phillips","Ivan Karamazov (Dostoevsky)"], argument:"Treating suffering as pedagogical is offensive — it instrumentalises victims. Ivan Karamazov returns the ticket; no future bliss justifies present innocent suffering.", counter:"Hick: the eschatological perspective changes the calculus.", response:"But this requires faith in the eschaton; the theodicy presupposes what's at issue." }
    ],
    conclusion:"Hick's theodicy is more humane than Augustine's but ultimately fails. The quantity and distribution of evil exceed soul-making need; Phillips' moral critique that instrumentalising suffering is monstrous is decisive. Universalism saves the conclusion but offends moral seriousness." },

  /* --- Nature of God --- */
  { id:"omniscience-freewill", paper:"01", topic:"Nature of God",
    question:"'God's omniscience is incompatible with human free will.' Discuss. [40]",
    thesis:"Classical omniscience and libertarian freedom are incompatible, but Boethius' atemporal solution and Swinburne's everlasting self-limiting God both preserve a coherent theism. Swinburne is more biblically defensible; Boethius is more metaphysically elegant.",
    paragraphs:[
      { topic:"The conflict", scholars:["Aristotle (sea battle)","Aquinas"], argument:"If God knows now what I will do tomorrow, my action is fixed. If God's knowledge is infallible, my freedom is illusory. Classical omniscience and libertarian freedom seem incompatible.", counter:"Compatibilism: freedom is doing what one wants, which God can predict.", response:"But compatibilism gives up libertarian freedom, which most theodicies require." },
      { topic:"Boethius' atemporal solution", scholars:["Boethius (Consolation V)","Anselm (4D)","Stump (ET-simultaneity)"], argument:"God exists eternally — outside time — so doesn't 'foreknow' but simply SEES all moments at once. Like a traveller seen from above. Knowledge is contemporaneous, not predictive.", counter:"How can a timeless being act in time?", response:"Stump's ET-simultaneity explains: eternal-temporal simultaneity is a special relation, not a contradiction." },
      { topic:"Swinburne's everlasting self-limitation", scholars:["Swinburne","Philippians 2 (kenosis)"], argument:"God is everlasting (in time) and voluntarily limits foreknowledge to preserve freedom. Kenosis has biblical support; God's love accepts this self-limitation.", counter:"This sacrifices classical omniscience.", response:"Coherent but revisionary — the trade is worth making for genuine interactivity. Boethius and Swinburne represent two valid responses." }
    ],
    conclusion:"Classical omniscience and libertarian freedom are incompatible in their strong forms, but theism has resources. Boethius preserves omniscience by atemporality; Swinburne preserves freedom by self-limitation. Neither requires giving up theism — only refining it." },

  { id:"divine-eternity", paper:"01", topic:"Nature of God",
    question:"'God is best understood as everlasting, not eternal.' Discuss. [40]",
    thesis:"Swinburne's everlasting God is biblically and pastorally superior to Boethius' eternal God, even if Boethius is more elegant metaphysically. A God who cannot act in time, respond to prayer, or undergo change cannot be the God of Abraham.",
    paragraphs:[
      { topic:"Boethius' eternal God", scholars:["Boethius","Anselm","Aquinas"], argument:"God is outside time, possessing all moments at once. Solves foreknowledge problem; preserves classical omniscience. 'Complete possession all at once of illimitable life.'", counter:"How does an atemporal being act in time?", response:"Aquinas: God acts eternally, the effects are temporal. Cogent but stretches credulity." },
      { topic:"Swinburne's everlasting God", scholars:["Swinburne","Wolterstorff (God Everlasting)"], argument:"God is IN time but without beginning or end. Voluntarily limits omniscience regarding future free actions. Can genuinely respond to prayer, undergo emotion, act in time.", counter:"Sacrifices classical theological purity.", response:"But preserves what scripture describes — God grieving, deciding, responding." },
      { topic:"Biblical and pastoral concerns", scholars:["Philippians 2 (kenosis)","Open theism","Aquinas's defenders"], argument:"Scripture everywhere shows God acting in time. Prayer assumes God can respond. Pastoral practice requires a God who acts now.", counter:"Anthropomorphism — scripture uses temporal language metaphorically.", response:"But the metaphors are pervasive and pastorally critical; a wholly timeless God is religiously unrecognisable." }
    ],
    conclusion:"Swinburne wins. The everlasting God is biblically and pastorally superior even if metaphysically less elegant. Boethius preserves a philosophical ideal at the cost of religious reality." },

  /* --- Religious Language 1 --- */
  { id:"via-negativa", paper:"01", topic:"Religious Language (Negative/Analogical/Symbolic)",
    question:"'The via negativa is the only honest approach to religious language.' Discuss. [40]",
    thesis:"Negative theology is a vital discipline within religious language but cannot be the only approach — Davies' critique shows it leaves nothing to worship. Aquinas' analogy preserves transcendence while saying something meaningful.",
    paragraphs:[
      { topic:"The case for via negativa", scholars:["Pseudo-Dionysius","Maimonides","Plotinus"], argument:"God transcends human categories; any positive predication anthropomorphises. Only negations preserve the divine 'beyond'. 'God is not a being' rather than 'God is a being'.", counter:"This leaves us with nothing positive to say.", response:"Mystical traditions argue that 'knowing by unknowing' is precisely the point — religious language should point beyond itself." },
      { topic:"Davies' critique", scholars:["Brian Davies"], argument:"If we can only say what God is not, we cannot pray to, worship, or love God. Religious life requires SOMETHING positive. Pure negation collapses into agnosticism.", counter:"Negative theology doesn't deny God's positive attributes — just their adequate expression.", response:"But then it isn't really purely negative; it presupposes the very positive content it denies." },
      { topic:"Aquinas' analogy as middle way", scholars:["Aquinas (Summa I.13)","Tillich (symbol)"], argument:"Analogy of attribution and analogy of proper proportion let us speak meaningfully of God without literal predication. 'God is good' is true analogically.", counter:"Tillich's symbol theory is even more flexible.", response:"But Tillich risks losing cognitive content entirely. Aquinas threads the needle." }
    ],
    conclusion:"Via negativa is a necessary discipline — religious language must preserve transcendence — but it is not the only honest approach. Aquinas' analogy is both honest and meaningful, doing what Dionysius and Tillich each only half achieve." },

  { id:"analogy-tillich", paper:"01", topic:"Religious Language (Negative/Analogical/Symbolic)",
    question:"Critically compare Aquinas' analogy with Tillich's symbol. [40]",
    thesis:"Aquinas' analogy preserves cognitive content while honoring transcendence; Tillich's symbol theory honours transcendence at the cost of cognitive content. For religious language to do the work believers want, Aquinas' approach is preferable.",
    paragraphs:[
      { topic:"Aquinas' analogy", scholars:["Aquinas (Summa I.13)","Cajetan (analogy of proper proportion)"], argument:"Analogy of attribution: 'healthy' applies properly to bodies and analogically to food/diet. Analogy of proper proportion: 'wise' applies to God and humans proportionally to their natures.", counter:"Analogy still presupposes some univocal core of meaning.", response:"Aquinas: the core is real but partial; we know God exists and is good without grasping his essence." },
      { topic:"Tillich's symbol", scholars:["Paul Tillich (Dynamics of Faith)"], argument:"Religious language is symbolic — it participates in what it signifies but doesn't literally describe. 'God exists' is symbolic; God is 'the ground of being' rather than 'a being'.", counter:"If 'God exists' is symbolic, what is being symbolised?", response:"Tillich: ultimate concern, the depth dimension of being. But this risks emptying religious language of cognitive content." },
      { topic:"Cognitive content", scholars:["J.L. Austin","Wittgenstein"], argument:"Religious utterances do work — they make claims, guide action, support practice. They cannot be purely expressive.", counter:"Tillich preserves this through symbolic function.", response:"But if we can't say WHAT 'God exists' claims, we can't evaluate it. Aquinas preserves evaluability through analogy." }
    ],
    conclusion:"Aquinas' analogy is more defensible than Tillich's symbol. Both honour transcendence, but only analogy preserves enough cognitive content for religious language to do its work. Tillich's symbol risks emptying the content it claims to preserve." },

  /* --- Religious Language 2 --- */
  { id:"verification-religious", paper:"01", topic:"Religious Language (20th Century)",
    question:"'Religious language is meaningful only if it is verifiable.' Discuss. [40]",
    thesis:"The verification principle is self-refuting and Ayer's strong version is dead. Mitchell and Hare show religious language is meaningful even when not strictly verifiable; Wittgenstein's language games preserve meaning at the cost of cognitive realism. The cognitivist position survives.",
    paragraphs:[
      { topic:"Verification and falsification", scholars:["Ayer (Language, Truth and Logic)","Flew (gardener parable)"], argument:"Ayer: a statement is meaningful iff analytically true or empirically verifiable. Religious statements are neither — therefore meaningless. Flew: 'death by a thousand qualifications' — religious claims survive any disconfirmation.", counter:"The verification principle is itself neither analytic nor empirically verifiable — self-refuting.", response:"Weak verification (some observations count for/against) lets religious statements back in." },
      { topic:"Hare and Mitchell", scholars:["Hare (bliks)","Mitchell (partisan parable)"], argument:"Hare: bliks are unfalsifiable but meaningful — they frame how we interpret experience. Mitchell: the resistance fighter trusts the leader despite ambiguous evidence; religious faith is qualified, not surrendered, by counter-evidence.", counter:"This still doesn't make religious claims testable.", response:"It shows they can be meaningful and rational without being testable — testability is not the criterion of meaning." },
      { topic:"Wittgenstein's language games", scholars:["Wittgenstein (Philosophical Investigations)","Phillips"], argument:"Meaning is use; religious language is a language game with its own grammar. Criticising it by scientific standards is a category error.", counter:"This makes religious claims non-cognitive.", response:"Phillips embraces this; cognitive realists argue religious language must make literal claims, leaving Aquinas' analogy as the alternative." }
    ],
    conclusion:"Religious language is not meaningful only if verifiable. The verification principle is self-refuting; falsification is too narrow; bliks and partisans show meaning without testability. The choice is between Wittgensteinian non-cognitivism and Thomistic analogical realism — both viable, both better than verificationism." },

  /* =========================================================================
     PAPER 02 — RELIGION AND ETHICS
     ========================================================================= */
  /* --- Natural Law --- */
  { id:"natural-law-reliable", paper:"02", topic:"Natural Law",
    question:"'Natural law provides a reliable method of moral decision-making.' Discuss. [40]",
    thesis:"Natural law succeeds as an internal Catholic ethic but fails as the universal rational method it claims to be. Aquinas' teleological premise cannot survive modern biology, and Finnis' reconstruction abandons the naturalism that gave natural law its name.",
    paragraphs:[
      { topic:"Aquinas' system", scholars:["Aquinas","Aristotle"], argument:"Human telos is union with God. Five primary precepts generate secondary precepts by reason. Double effect refines absolutism. Coherent within Catholic tradition.", counter:"How do we know human nature has a telos?", response:"Aquinas: practical reason recognises basic goods. Internally coherent for a Catholic worldview." },
      { topic:"Modern biology undermines telos", scholars:["Nietzsche","Darwin","Finnis"], argument:"Evolution selects for reproductive fitness, not flourishing. There is no metaphysical purpose to human nature.", counter:"Finnis grounds basic goods in self-evident practical reason.", response:"But this abandons naturalism — natural law becomes rationalist intuitionism, less 'natural' and more invented." },
      { topic:"Naturalistic fallacy", scholars:["Hume (is/ought)","Moore"], argument:"Hume: you cannot derive 'ought' from 'is'. Moore: 'good' is not identical to any natural property. Natural law moves from biological function to moral claim illegitimately.", counter:"Aquinas argues from telos to practical reason, not directly from nature to ought.", response:"But the telos itself is a normative claim about nature, so the gap reappears at one remove." }
    ],
    conclusion:"Natural law is reliable within the Catholic tradition that grants its premises; it is not reliable as the universal rational method it claims to be. Finnis' rescue concedes the original objection by abandoning naturalism." },

  { id:"natural-law-double-effect", paper:"02", topic:"Natural Law",
    question:"'The doctrine of double effect makes natural law incoherent.' Discuss. [40]",
    thesis:"Double effect doesn't make natural law incoherent, but it does expose natural law's hidden consequentialism. Refining the absolute prohibitions with conditional permissions blurs the deontological/consequentialist boundary in ways Aquinas didn't intend.",
    paragraphs:[
      { topic:"Double effect explained", scholars:["Aquinas (Summa II-II.64.7)"], argument:"An act with good and bad effects is permissible if: act not intrinsically evil; only good effect intended; good not achieved by means of bad; good proportionate to bad. Classic case: self-defence.", counter:"This sneaks consequentialist reasoning into deontology.", response:"Aquinas: intention matters morally, not just outcome. Double effect maintains intentionalism." },
      { topic:"The proportionality criterion", scholars:["Aquinas","Hoose (proportionalism)"], argument:"Requirement that good be proportionate to bad is essentially a utilitarian calculation. Hoose's proportionalism explicitly extends this.", counter:"Proportionality is constrained by the prior intrinsic-evil prohibition.", response:"But the prior prohibition is doing all the work; proportionality is just selecting among permitted options consequentially." },
      { topic:"Coherence preserved by intentionality", scholars:["Aquinas","Anscombe"], argument:"Anscombe defends double effect via intentional structure. Killing in self-defence intends self-preservation, not killing. The deontological core (intentions matter) remains intact.", counter:"This makes 'intention' carry too much weight; foreseen but unintended consequences seem morally identical.", response:"Anscombe: foreseen-but-unintended is genuinely different — it preserves moral integrity in tragic dilemmas." }
    ],
    conclusion:"Double effect doesn't make natural law incoherent, but it does soften absolutism in ways that make natural law's claim to deontological purity hard to maintain. The doctrine is defensible but exposes a tension." },

  { id:"natural-law-sexual", paper:"02", topic:"Natural Law",
    question:"'Natural law fails on sexual ethics.' Discuss. [40]",
    thesis:"Natural law's sexual ethics is internally consistent but externally vulnerable. The conclusions on contraception and homosexuality cannot be derived from natural reason alone without theological premises, making natural law's universal claims implausible here.",
    paragraphs:[
      { topic:"The traditional position", scholars:["Aquinas","Humanae Vitae (1968)","John Paul II"], argument:"Sex's telos is procreative-unitive within marriage. Contraception, masturbation, homosexual acts frustrate this telos and are therefore wrong.", counter:"Why is biological function morally normative?", response:"Aquinas: God built telos into nature; following nature is following divine ordinance." },
      { topic:"Modern critique", scholars:["Curran","Gareth Moore","secular philosophers"], argument:"Same arguments would forbid sex during pregnancy or post-menopause (no procreation possible). Selective application reveals theological assumptions doing the real work.", counter:"Catholic teaching distinguishes natural infertility from chosen sterility.", response:"But this distinction itself requires theological premises about intention before God, not biological telos." },
      { topic:"Finnis' modern natural law", scholars:["Finnis","Grisez"], argument:"New natural law theorists try to defend traditional conclusions on grounds of integral human flourishing rather than biology.", counter:"But the conclusions are unchanged; the new arguments look like rationalisations of pre-existing Catholic teaching.", response:"This is the deeper problem: natural law's conclusions on sex never come from neutral reasoning, only from a Catholic worldview." }
    ],
    conclusion:"Natural law fails on sexual ethics in the sense that its conclusions cannot be derived from universal reason alone. Within Catholic theology, it is coherent; as a universal ethical method, it overreaches when applied to sex." },

  /* --- Situation Ethics --- */
  { id:"situation-subjective", paper:"02", topic:"Situation Ethics",
    question:"'Situation ethics is too subjective to be a reliable ethical theory.' Discuss. [40]",
    thesis:"Situation ethics is subjective in the sense that it requires judgement, but no more so than virtue ethics or any non-rule-based approach. Its real failure is not subjectivity but the inability to operationalise 'love' without supplementary criteria.",
    paragraphs:[
      { topic:"Fletcher's system", scholars:["Fletcher","Robinson (Honest to God)"], argument:"Agape is the only absolute. Six propositions; four working principles (pragmatism, relativism, positivism, personalism). Rules are guides, not absolutes — break them when love demands.", counter:"Without rules, how do agents know what love requires?", response:"Fletcher: experience and conscience. But this risks rationalising self-interest." },
      { topic:"The subjectivity charge", scholars:["Barclay","critics of Fletcher"], argument:"Different agents disagree about what love requires. Without external criteria, situation ethics collapses into 'do what feels right'.", counter:"Virtue ethics has the same structure — phronesis judges particulars.", response:"True, but virtue ethics also gives content (the virtues); 'love' alone is too thin." },
      { topic:"Defences", scholars:["Fletcher","situationist Christians"], argument:"Situation ethics matches actual moral life — we DO weigh consequences against rules. It captures the spirit of Jesus' Sabbath teaching.", counter:"But Jesus also gave clear commands; he was not a pure situationist.", response:"Fletcher's reading of Jesus is selective; situationism is more modern existentialism than gospel ethics." }
    ],
    conclusion:"Situation ethics is moderately subjective — like all judgement-based ethics — but its real weakness is that 'love' alone cannot generate determinate guidance. It needs supplementary criteria (rules, virtues) that compromise its purity." },

  /* --- Kant --- */
  { id:"kant-abstract", paper:"02", topic:"Kantian Ethics",
    question:"'Kantian ethics is too abstract to be useful.' Discuss. [40]",
    thesis:"Kantian ethics is the best available foundation for human rights but too austere to be a complete moral theory. The categorical imperative protects persons from instrumentalisation but undervalues character, motivation, and relationship.",
    paragraphs:[
      { topic:"The categorical imperative", scholars:["Kant (Groundwork)"], argument:"Three formulations: universalisability, humanity-as-end-in-itself, kingdom of ends. Together generate strong protections — slavery, torture, deception are absolutely forbidden.", counter:"How do these apply to real dilemmas? Universalisability seems formal not substantive.", response:"Kant's case: lying, theft, breaking promises all fail universalisation; the imperative IS substantive." },
      { topic:"The lying problem", scholars:["Kant ('On a Supposed Right to Lie')","Benjamin Constant","Williams"], argument:"Kant's notorious case: you must not lie to the murderer at the door. Most moderns find this monstrous.", counter:"Modern Kantians (Korsgaard, O'Neill) read Kant more flexibly.", response:"But every non-consequentialist faces hard cases; utilitarianism approves torture if it saves five." },
      { topic:"Strengths in practice", scholars:["O'Neill","Habermas","UN Declaration of Human Rights"], argument:"Kant grounds the modern vocabulary of rights and dignity. Human rights discourse is Kantian in substance.", counter:"Bernard Williams: Kantian 'moral saint' is psychologically alien — acts rightly but loves nothing.", response:"Kant needs supplementing with Aristotelian virtue, not replacing." }
    ],
    conclusion:"Kantian ethics is too austere to be complete but indispensable as a foundation. The categorical imperative grounds rights absolutely; what it misses (character, relationship, motivation) is supplied by virtue ethics. The mature ethical theory uses both." },

  { id:"kant-religion", paper:"02", topic:"Kantian Ethics",
    question:"'Kant's three postulates make his ethics religious.' Discuss. [40]",
    thesis:"Kant's postulates of freedom, immortality, and God show that his ethics is religious in structure even if not in foundation. Rationally autonomous ethics still requires theological assumptions to make sense — a tacit admission that secular moral theory cannot stand alone.",
    paragraphs:[
      { topic:"The three postulates", scholars:["Kant (Critique of Practical Reason)"], argument:"Practical reason requires freedom (otherwise 'ought' is meaningless), immortality (virtue must be achievable), and God (to proportion happiness to virtue — the summum bonum).", counter:"Postulates are not proofs; they are practical necessities.", response:"But Kant himself says they are necessary for the moral life — without them, ethics is incomplete." },
      { topic:"The summum bonum problem", scholars:["Kant","Mackie (Miracle of Theism)"], argument:"Virtue and happiness must ultimately coincide for morality to be coherent. This life doesn't achieve this; only God and immortality can.", counter:"Mackie: this is religious nostalgia — moral coherence doesn't require its eventual reward.", response:"But Kant takes the demand seriously; without it, moral motivation seems undermined." },
      { topic:"Secular reading", scholars:["Modern Kantians","Korsgaard"], argument:"Modern Kantians often drop the postulates and defend the categorical imperative on autonomy alone.", counter:"This loses what Kant himself thought essential — postulates aren't decorative.", response:"It works for ethics in practice but suggests Kant's full system is religious whether or not its founder fully acknowledged this." }
    ],
    conclusion:"Kant's postulates do make his ethics religious in structure. He grounds autonomous reason in theological postulates — a tacit recognition that ethics needs religion to be complete. Modern Kantians drop the postulates but at a cost." },

  /* --- Utilitarianism --- */
  { id:"utilitarianism-best", paper:"02", topic:"Utilitarianism",
    question:"'Utilitarianism is the best approach to moral decision-making.' Discuss. [40]",
    thesis:"Utilitarianism is indispensable for public policy but indefensible as a complete moral theory. The justice problem (sheriff, organ harvest) is fatal; the right architecture is utility within Kantian constraints, not utility alone.",
    paragraphs:[
      { topic:"Strengths", scholars:["Bentham","Mill","Singer"], argument:"Impartiality, transparency, policy fit. Foundation of cost-benefit analysis, triage, welfare economics. Takes suffering seriously.", counter:"Hedonic calculus is unworkable; pleasures aren't commensurable.", response:"Rough calculation is still better than no calculation in policy." },
      { topic:"Justice problem", scholars:["Williams (sheriff)","McCloskey (organ harvest)","Rawls"], argument:"Williams: framing one innocent prevents a riot — utility positive, clearly wrong. Harvest one visitor for five patients — same logic. Cannot protect individuals against collective gain.", counter:"Rule utilitarianism: follow rules whose general observance maximises utility.", response:"If a rule is justified by utility, why not break it when breaking serves utility? Collapses into act." },
      { topic:"Demandingness and distribution", scholars:["Singer (famine relief)"], argument:"Singer: give until marginal disutility to you equals marginal utility to recipient. Monstrously demanding.", counter:"Either morality is that demanding, or utilitarianism is wrong.", response:"Indifferent to distribution: 100 units for one equals 10 for ten. Ignores moral weight of fairness." }
    ],
    conclusion:"Utilitarianism is best for public policy and worst for individual rights. The right verdict: utility within Kantian constraints, not utility as master. As a complete theory it is false; as a tool within an ethic of rights, indispensable." },

  { id:"mill-vs-bentham", paper:"02", topic:"Utilitarianism",
    question:"'Mill's qualitative utilitarianism is an improvement on Bentham's.' Discuss. [40]",
    thesis:"Mill's higher pleasures successfully answer the 'doctrine fit for swine' objection but at the cost of importing non-utilitarian values. The improvement is real but compromises utilitarianism's claim to value-neutrality.",
    paragraphs:[
      { topic:"Bentham's pure quantitative view", scholars:["Bentham (Principles of Morals and Legislation)"], argument:"Hedonic calculus: intensity, duration, certainty, propinquity, fecundity, purity, extent. All pleasures equal in kind; only quantity matters.", counter:"This makes pushpin equal to poetry — absurd.", response:"Bentham: if pushpin really does produce equal pleasure, it really is equal. Consistency matters." },
      { topic:"Mill's qualitative distinction", scholars:["Mill (Utilitarianism)"], argument:"Higher (intellectual) and lower (bodily) pleasures. 'Better to be Socrates dissatisfied than a pig satisfied.' Competent judges who have experienced both prefer higher pleasures.", counter:"This imports non-utilitarian values (intellectual goods are intrinsically better).", response:"Mill: the preference IS still about pleasure — higher pleasures are pleasanter for those who can appreciate them. Question-begging?" },
      { topic:"Rule utilitarianism", scholars:["Mill","Hare (two-level utilitarianism)"], argument:"Mill shifts toward rule utilitarianism: act on rules whose general observance maximises utility. More predictable than act utilitarianism.", counter:"Either rules are absolute (so not utilitarian) or they bend (so collapse into act).", response:"Hare's two-level: intuitive level uses rules, critical level uses calculation. Pragmatically defensible." }
    ],
    conclusion:"Mill improves on Bentham by addressing the 'doctrine fit for swine' objection, but at the cost of importing non-utilitarian values. The improvement is real but exposes a tension between purity and plausibility that utilitarianism never fully resolves." },

  { id:"singer-demanding", paper:"02", topic:"Utilitarianism",
    question:"'Singer's preference utilitarianism makes unreasonable moral demands.' Discuss. [40]",
    thesis:"Singer's demands are uncomfortable but not unreasonable on utilitarian premises. The real lesson is that utilitarianism's premises are wrong; common-sense morality permits us legitimate partiality, which utilitarianism cannot accommodate.",
    paragraphs:[
      { topic:"Singer's argument", scholars:["Singer ('Famine, Affluence, and Morality')"], argument:"If we can prevent bad without sacrificing anything of comparable moral importance, we ought to. Therefore we ought to give to famine relief until our own marginal disutility equals recipients' marginal utility.", counter:"This demands almost everything we have.", response:"Singer accepts this; common-sense morality is too lenient." },
      { topic:"The over-demandingness objection", scholars:["Williams","Susan Wolf (moral saints)"], argument:"A morality that demands one give up personal projects, family priority, hobbies is inhumane. Susan Wolf: moral saints are not admirable.", counter:"Singer: this is moral cowardice dressed as philosophy.", response:"Williams: ground projects constitute personhood; demanding their sacrifice undermines selfhood." },
      { topic:"What follows", scholars:["Singer","virtue ethics"], argument:"If Singer's conclusion is unreasonable, his premises must be wrong. The principle that 'all suffering counts equally' cannot accommodate legitimate partiality.", counter:"Maybe legitimate partiality is what we should give up.", response:"But this requires abandoning what we recognize as central to ethical life — love, friendship, family. Too high a cost." }
    ],
    conclusion:"Singer's demands are not unreasonable on utilitarian premises — they are utilitarianism's logical conclusion. That they are unreasonable shows utilitarianism's premises must be wrong. Common-sense morality recognises legitimate partiality that utilitarianism cannot." },

  /* --- Euthanasia --- */
  { id:"euthanasia-never", paper:"02", topic:"Euthanasia",
    question:"'Euthanasia can never be justified.' Discuss. [40]",
    thesis:"Voluntary euthanasia for competent terminally-ill patients is morally permissible. Sanctity of life cannot be defended in secular medical ethics; autonomy, compassion, and consistency with existing medical practice all favour carefully regulated voluntary euthanasia.",
    paragraphs:[
      { topic:"The sanctity argument", scholars:["Aquinas","Pope John Paul II (Evangelium Vitae)","Catholic teaching"], argument:"Human life is intrinsically valuable; only God may end it. Even suffering is morally meaningful.", counter:"Sanctity is a religious premise not shared by all.", response:"In secular ethics, we already make quality-of-life judgements (withdrawing treatment); the question is who decides." },
      { topic:"The autonomy argument", scholars:["Mill","Glover (Causing Death and Saving Lives)","Singer"], argument:"Competent adults should decide what happens to their own bodies. Autonomy is the foundation of medical ethics; respecting it sometimes means assisting suicide.", counter:"Slippery slope: voluntary becomes pressure on the vulnerable.", response:"Empirical evidence from Oregon, Netherlands is mixed; safeguards work imperfectly but they work." },
      { topic:"Killing vs letting die", scholars:["Rachels ('Active and Passive Euthanasia')"], argument:"Rachels: no moral difference between killing and letting die. Withdrawing life support (legal) and active euthanasia (illegal) achieve same end; the legal distinction is psychological, not moral.", counter:"Catholic teaching: passive (let die) ≠ active (kill).", response:"This distinction collapses under analysis. If we accept withdrawal, we have already accepted death as preferable; active is more honest." }
    ],
    conclusion:"Voluntary euthanasia can be justified for competent terminally-ill patients. Sanctity arguments don't hold in secular ethics; autonomy, compassion, and consistency with current practice support carefully regulated euthanasia. The 'never' position is unsustainable." },

  /* --- Business Ethics --- */
  { id:"good-ethics-good-business", paper:"02", topic:"Business Ethics",
    question:"'Good ethics is good business.' Discuss. [40]",
    thesis:"In the long run, good ethics often correlates with good business, but not reliably enough to ground ethics on prudential grounds. Friedman's shareholder-only theory is rejected; stakeholder ethics is right, but only when grounded in genuine moral commitment, not strategic calculation.",
    paragraphs:[
      { topic:"Friedman's challenge", scholars:["Milton Friedman (1970 NYT)"], argument:"The social responsibility of business is to increase profits. Spending shareholder money on social causes is theft. Corporations are profit-makers; individuals decide charitable use.", counter:"Corporations affect non-shareholders massively (employees, communities, environment).", response:"Public granted them limited liability; the public can require accountability." },
      { topic:"Stakeholder theory", scholars:["R. Edward Freeman","Carroll (CSR pyramid)"], argument:"Corporations have responsibilities to all stakeholders. Modern ESG frameworks operationalise this. CSR done well builds customer loyalty, employee retention, brand value.", counter:"Critics: this is just enlightened self-interest, not ethics.", response:"True — but the convergence of ethics and self-interest is partial. Ethics demands sacrifice when they diverge." },
      { topic:"When ethics and business diverge", scholars:["Naomi Klein","Rana Plaza (2013)"], argument:"Genuine ethical commitment sometimes costs profit. Rana Plaza: cheap supply chains kill workers. Western brands cut corners until pressured.", counter:"Once exposed, ethics return as good business.", response:"But this requires exposure. Ethics grounded in 'good business' won't act before exposure; only ethics grounded in moral commitment will." }
    ],
    conclusion:"Good ethics often is good business — but not always. Grounding ethics on its profitability gives no guidance when they diverge. Stakeholder ethics is right; but only when grounded in genuine moral commitment, not strategic calculation." },

  { id:"whistleblowing", paper:"02", topic:"Business Ethics",
    question:"'Whistle-blowers are morally obliged to disclose wrongdoing.' Discuss. [40]",
    thesis:"Whistle-blowing is morally obligatory when serious public harm is at stake and internal remedies have failed, but the obligation is bounded by considerations of proportionality and confidentiality. Most actual whistle-blowers face severe personal costs that society fails to compensate.",
    paragraphs:[
      { topic:"The Kantian case", scholars:["Kant","Bok (Lying, Secrets)"], argument:"Duty to truth and public welfare can override loyalty to employer. Universalisability supports disclosure of serious wrongdoing.", counter:"Loyalty and confidentiality are also Kantian duties.", response:"In conflict, the more universal duty (public welfare) trumps the more particular (loyalty)." },
      { topic:"The utilitarian case", scholars:["Bentham","Mill"], argument:"Disclose if benefits to public outweigh costs to disclose. Enron, tobacco companies, Snowden — disclosure benefited millions.", counter:"Slippery slope: every employee thinks themselves justified.", response:"Mature whistle-blowing requires serious threshold (serious harm, internal remedies failed) — not every disagreement justifies disclosure." },
      { topic:"Institutional context", scholars:["UK Public Interest Disclosure Act 1998","Snowden case"], argument:"Legal protections exist but are widely circumvented. Most whistle-blowers lose careers, suffer personally.", counter:"The cost is part of the moral test — if it weren't costly, it wouldn't be sacrifice.", response:"But society benefits and should compensate; placing the entire cost on the whistle-blower is unjust." }
    ],
    conclusion:"Whistle-blowing is morally obligatory in serious cases, bounded by proportionality. The deeper ethical failure is institutional — societies that benefit from whistle-blowers without protecting them. Legal reform is part of the ethical response." },

  /* --- Meta-ethics --- */
  { id:"emotivism-meaningless", paper:"02", topic:"Meta-ethics",
    question:"'Ethical statements are no more than expressions of feeling.' Discuss. [40]",
    thesis:"Emotivism is false, intuitionism is incomplete, and a cautious naturalism-plus-intuition is the best account. Emotivism cannot explain why moral disagreement looks like genuine disagreement or why we reason about ethics; this alone refutes it.",
    paragraphs:[
      { topic:"Emotivism", scholars:["Ayer","Stevenson"], argument:"Moral statements are not truth-apt; they express attitudes. 'Murder is wrong' = 'boo to murder!' Follows from logical positivism.", counter:"Logical positivism is dead — the verification principle is self-refuting.", response:"Emotivism survives without positivism; non-cognitivist accounts (Stevenson, Hare) refine it." },
      { topic:"Why emotivism fails", scholars:["Moore","Foot","Mackie"], argument:"Emotivism cannot explain: (a) moral disagreement looking like genuine disagreement, (b) the rationality of moral argument, (c) moral progress (we now think slavery wrong, not just feel it wrong).", counter:"Stevenson: persuasive force explains argument.", response:"But persuasive force presupposes that some persuasion is rationally better than others — which requires moral facts." },
      { topic:"Naturalism with intuition", scholars:["Sturgeon (Cornell realism)","Ross (prima facie duties)","Rawls (reflective equilibrium)"], argument:"Moral facts can be natural facts (Cornell realism), grasped imperfectly by intuition (Ross), refined by reflective equilibrium (Rawls).", counter:"Hume's is/ought gap still bites.", response:"Cornell realists argue 'good' refers to natural properties without reductive definition — like 'water' to H2O." }
    ],
    conclusion:"Ethical statements are not mere expressions of feeling. Emotivism cannot account for moral disagreement, reasoning, or progress. A moderate moral realism — naturalism corrected by intuition — survives and is the best available account." },

  { id:"naturalistic-fallacy", paper:"02", topic:"Meta-ethics",
    question:"'Moore's naturalistic fallacy destroys naturalism.' Discuss. [40]",
    thesis:"Moore's open question argument damaged but did not kill naturalism. Modern Cornell realists show moral properties can be natural without being reductively definable — like natural kinds in biology. The deeper challenge is Hume's is/ought gap.",
    paragraphs:[
      { topic:"Moore's argument", scholars:["Moore (Principia Ethica)"], argument:"For any proposed natural property N, we can coherently ask 'is N good?' If 'good' meant N, the question would be trivial. So 'good' is not identical to any natural property.", counter:"This is a verbal argument — what about conceptual analysis?", response:"Even granting Moore's point about analytical definability, naturalism could still hold synthetically." },
      { topic:"Cornell realism", scholars:["Sturgeon","Brink","Boyd"], argument:"Moral properties are natural but not reductively definable, like biological kinds. We can refer to water without defining it as H2O; similarly, refer to good without naturalistic definition.", counter:"This rescues naturalism but at the cost of giving it any clear content.", response:"It provides empirical content via the moral facts themselves; method is broadly empirical." },
      { topic:"The deeper challenge", scholars:["Hume","Anscombe"], argument:"Hume's is/ought gap is logically prior to Moore's fallacy. Even granting good is natural, prescriptive 'ought' doesn't derive from descriptive 'is'.", counter:"Foot: gap can be bridged via concept of human nature.", response:"Anscombe: only if we have a notion of function, which presupposes theological assumptions." }
    ],
    conclusion:"The naturalistic fallacy damaged but did not destroy naturalism. Modern naturalism survives via Cornell realism. The deeper challenge is Hume's is/ought gap, which natural law and virtue ethics try to bridge with varying success." },

  /* --- Conscience --- */
  { id:"freud-conscience", paper:"02", topic:"Conscience",
    question:"'Freud's account of conscience is more convincing than Aquinas'.' Discuss. [40]",
    thesis:"Neither account is adequate alone. Aquinas correctly identifies moral reasoning as real but wrongly locates it in a single divine faculty; Freud correctly identifies upbringing as shaping moral emotion but wrongly reduces conscience to the super-ego.",
    paragraphs:[
      { topic:"Aquinas: conscience as reason", scholars:["Aquinas (synderesis, conscientia)"], argument:"Synderesis is innate disposition to good (infallible); conscientia is its application (fallible). Conscience errs through lack of knowledge, not lack of goodness.", counter:"If synderesis is universal and infallible, why moral disagreement?", response:"Disagreement is at the level of conscientia. Synderesis is the bare principle 'do good, avoid evil'." },
      { topic:"Freud: conscience as super-ego", scholars:["Freud","Fromm (authoritarian vs humanistic)"], argument:"Super-ego is internalised parental and social prohibitions. What religion calls 'voice of God' is internalised father. Guilt is often neurotic.", counter:"Freud's account is reductive.", response:"Empirical evidence supports the mechanism, especially in excessive religious guilt." },
      { topic:"Modern moral psychology", scholars:["Haidt","Kohlberg","Gilligan"], argument:"Conscience is plural: cognitive reasoning + moral emotion + social learning. Haidt: moral intuition precedes rationalisation.", counter:"This dilutes 'conscience' into many things.", response:"That dilution may be the truth — both Aquinas and Freud were partly right, partly wrong." }
    ],
    conclusion:"Freud is not more convincing than Aquinas; both capture part of conscience. Aquinas' synderesis survives as moral reasoning capacity; Freud's super-ego survives as one mechanism of moral emotion. Conscience is plural." },

  { id:"conscience-god-voice", paper:"02", topic:"Conscience",
    question:"'Conscience is the voice of God.' Discuss. [40]",
    thesis:"Conscience is not literally God's voice but, on Aquinas' account, the human faculty of moral reason given by God. Newman and Butler develop the religious reading; Freud secularises it. Modern psychology supports neither extreme fully.",
    paragraphs:[
      { topic:"Religious accounts", scholars:["Newman ('aboriginal Vicar of Christ')","Butler (Fifteen Sermons)","Aquinas"], argument:"Newman: conscience is the voice of God's law in the soul. Butler: conscience is a superintendent faculty distinguishing self-love from benevolence. Aquinas: reason given by God.", counter:"If conscience is God's voice, why does it err?", response:"Aquinas distinguishes synderesis (infallible) from conscientia (fallible application)." },
      { topic:"Secular accounts", scholars:["Freud","Fromm","Marx"], argument:"Freud: super-ego, internalised parental authority. Fromm: distinguish authoritarian (imposed) from humanistic (authentic) conscience. Marx: false consciousness shaped by class.", counter:"These reduce conscience to psychology or sociology.", response:"They don't deny conscience exists — they explain its mechanism without supernaturalism." },
      { topic:"Convergence", scholars:["Modern psychology","Haidt","developmental theorists"], argument:"Modern accounts converge on conscience as a complex of cognition, emotion, and social learning. Some theists accept this AND see God working through these natural processes.", counter:"This makes 'God's voice' redundant.", response:"Or it makes it richer — God's voice is mediated through nature, as in natural law." }
    ],
    conclusion:"Conscience is not literally God's voice — but on Aquinas' view, it is the human faculty of moral reason ordered by God. Freud's super-ego captures the psychology; Aquinas captures the theology. Both together approximate the truth." },

  /* --- Sexual Ethics --- */
  { id:"sexual-relevance", paper:"02", topic:"Sexual Ethics",
    question:"'Religious ethical approaches still have relevance to modern sexual ethics.' Discuss. [40]",
    thesis:"Religious sexual ethics retains some relevance — insights about commitment, family, intrinsic worth — but its specific prohibitions on contraception, premarital sex, and same-sex relationships have been overtaken by secular ethics' attention to consent, equality, and autonomy.",
    paragraphs:[
      { topic:"Traditional teaching", scholars:["Aquinas","Humanae Vitae","John Paul II (theology of the body)"], argument:"Sex's telos is procreative-unitive within marriage. Premarital sex, contraception, same-sex acts are condemned. Family is the natural unit.", counter:"Secular ethics rejects these on grounds of autonomy and consent.", response:"Religious ethics still offers something secular ethics often misses: sexual relationships as morally weighty, not merely consensual." },
      { topic:"Specific failures", scholars:["Curran","feminist theologians","secular philosophers"], argument:"On homosexuality, contraception, divorce: religious teaching has been outpaced by secular reflection on equality, autonomy, harm. Selective biblical interpretation reveals motivated reasoning.", counter:"Religious teaching has internal resources for development.", response:"Some churches have developed (Anglican on contraception); others haven't (Catholic). Where they haven't, secular ethics is more reliable." },
      { topic:"What still matters", scholars:["Margaret Farley","Stanley Hauerwas"], argument:"Religious ethics retains insights about: sexual exclusivity as covenantal, marriage as community-shaped, sex as bodily union with moral weight. These are real contributions.", counter:"Secular ethics can develop these without religious framework.", response:"Possible but historically rare; religious traditions have been disproportionately the source of these insights." }
    ],
    conclusion:"Religious sexual ethics is still relevant but in modified form. Its specific prohibitions on contraception, premarital sex, same-sex relationships have been outpaced; its deeper insights about commitment, family, embodied selfhood remain valuable contributions." },

  /* =========================================================================
     PAPER 03 — CHRISTIAN THOUGHT
     ========================================================================= */
  /* --- Augustine on Human Nature --- */
  { id:"augustine-pessimistic", paper:"03", topic:"Augustine on Human Nature",
    question:"'Augustine's view of human nature is too pessimistic.' Discuss. [40]",
    thesis:"Augustine's theology is biologically false and morally troubling in its details but psychologically profound; demythologised, it survives as insight into the curvature of the will, not as doctrine.",
    paragraphs:[
      { topic:"Augustine's account", scholars:["Augustine (Confessions, City of God)","Romans 5:12"], argument:"Adam's Fall transmitted original sin biologically. All humans inherit disordered will (incurvatus in se), concupiscence, mortality. Salvation requires grace; humans cannot save themselves.", counter:"Pelagius: humans have genuine free will and can choose good without grace.", response:"Augustine: Pelagius underestimates the depth of fallen will (Romans 7: 'I do not do the good I want')." },
      { topic:"Biological and moral problems", scholars:["Modern evolutionary biology","Schleiermacher","Rahner"], argument:"Literal Fall and single human pair are scientifically untenable. Biological transmission of guilt through sex is morally obscene. Schleiermacher: perfect creation can't produce corruption without already containing the flaw.", counter:"Catholic theology reinterprets the Fall mythically (Rahner).", response:"But this changes Augustine's account; it doesn't defend it literally." },
      { topic:"What survives", scholars:["Niebuhr","Charles Taylor","Aquinas"], argument:"Augustine's diagnosis of the will (incurvatus in se) remains a powerful description. Niebuhr: Augustinian realism without literal Fall.", counter:"Aquinas softens: grace perfects nature; nature is wounded, not destroyed.", response:"Augustine is too pessimistic taken literally; not too pessimistic as description of fallen pattern." }
    ],
    conclusion:"Augustine is too pessimistic only if we take the literal Fall as his main claim; not too pessimistic if we take his analysis of the fallen will as what matters. Keep the insight, abandon the mechanism." },

  { id:"original-sin", paper:"03", topic:"Augustine on Human Nature",
    question:"'The doctrine of original sin is no longer credible.' Discuss. [40]",
    thesis:"The literal doctrine of original sin — biological transmission from a single human pair — is no longer credible. But the underlying claim that humans are born into a structurally distorted condition we cannot escape unaided remains psychologically and theologically defensible.",
    paragraphs:[
      { topic:"Literal version untenable", scholars:["Augustine","modern evolutionary biology"], argument:"Augustine's account requires Adam and Eve as historical first pair, with guilt biologically transmitted. Modern genetics and evolution rule both out.", counter:"Catholic teaching has moved toward mythic interpretation.", response:"But this changes the doctrine's content substantially." },
      { topic:"Demythologised versions", scholars:["Rahner","Schleiermacher","Niebuhr"], argument:"Original sin as universal solidarity in human sinfulness (Schleiermacher); as the structural condition we are born into (Niebuhr); as Augustine without literal Fall (Rahner).", counter:"This is just generic moral pessimism.", response:"It captures something specific: the universal structural condition, not mere weakness — Pelagius is still wrong." },
      { topic:"Psychological credibility", scholars:["Reinhold Niebuhr","modern psychology"], argument:"Humans are born into language, family, society that shape moral failures. Self-deception, in-group bias, motivated cognition are universal.", counter:"This is sociology, not theology.", response:"It supports the theological claim: humans cannot save themselves by their own effort. Grace (broadly conceived) is needed." }
    ],
    conclusion:"Original sin in literal form is no longer credible; demythologised, it survives as a powerful description of the universal structural condition humans are born into. The doctrine has changed shape but not died." },

  /* --- Death and Afterlife --- */
  { id:"hell-state-place", paper:"03", topic:"Death and Afterlife",
    question:"'Hell is a state, not a place.' Discuss. [40]",
    thesis:"The traditional geography of heaven and hell is symbolic; the spiritual-state interpretation preserves the doctrine while accommodating modern cosmology. C.S. Lewis' 'hell locked from the inside' is the most defensible Christian view; universalism is morally more attractive but theologically thinner.",
    paragraphs:[
      { topic:"Traditional and modern readings", scholars:["Dante (Inferno)","C.S. Lewis (The Great Divorce)"], argument:"Traditional: hell as place of eternal torment. Modern: hell as the state of separation from God chosen by the unrepentant. Lewis: doors locked from inside — damned prefer hell to heaven.", counter:"Lewis' view requires that we keep choosing hell eternally — is that coherent?", response:"Lewis: settled character; the damned are those who have made themselves incapable of accepting love." },
      { topic:"Universalist alternative", scholars:["Hick (Death and Eternal Life)","Origen","David Bentley Hart"], argument:"All souls eventually reach God. God's love is unconquerable. Eternal torment incompatible with divine goodness.", counter:"This removes moral seriousness — why does ethics matter if all are saved?", response:"Hick: we take moral decisions seriously without needing eternal stakes." },
      { topic:"What survives literalism", scholars:["Aquinas","modern Catholic teaching","Anglican rethinking"], argument:"Modern Catholic teaching: hell is real but not necessarily populated; conditional immortality (annihilationism) gaining traction.", counter:"This still preserves the concept of hell.", response:"Whether place, state, or empty concept, hell as eternal torment in fire is no longer the mainstream Christian view." }
    ],
    conclusion:"Hell as place is theologically untenable; hell as state (Lewis) is defensible. Universalism is morally attractive but loses theological tension. The mature Christian view treats hell as the real possibility of self-chosen separation, not divine punishment." },

  { id:"election-limited", paper:"03", topic:"Death and Afterlife",
    question:"Critically assess the doctrine of limited election. [40]",
    thesis:"Limited election (Calvinism) preserves divine sovereignty at the cost of divine love. The doctrine is internally consistent but morally repugnant; Arminian and universalist alternatives are more defensible.",
    paragraphs:[
      { topic:"The Calvinist position", scholars:["Calvin (Institutes)","Westminster Confession"], argument:"God elects some to salvation from eternity; others are passed over (reprobate). Election is not based on foreseen merit but on divine sovereignty alone.", counter:"This makes God appear arbitrary and unloving.", response:"Calvin: God's justice cannot be measured by human standards; election is mystery." },
      { topic:"Arminian critique", scholars:["Arminius","Wesley"], argument:"God offers salvation to all; humans freely accept or reject. Election is corporate (the church) and conditional (on response to grace).", counter:"This sacrifices divine sovereignty.", response:"It preserves divine love and human responsibility — better trade." },
      { topic:"Universalist critique", scholars:["Origen","Hick","David Bentley Hart"], argument:"Eternal damnation of any is incompatible with divine love. Apokatastasis: ultimate restoration of all things.", counter:"Universalism conflicts with biblical warnings.", response:"Hart: biblical 'eternal' (aionios) means 'of the age' — not necessarily eternal duration." }
    ],
    conclusion:"Limited election fails morally. Arminian conditional election preserves both freedom and love; universalism goes further in preserving love but at theological cost. Calvinism remains internally consistent but unattractive to modern moral sensibilities." },

  /* --- Knowledge of God --- */
  { id:"revelation-only", paper:"03", topic:"Knowledge of God",
    question:"'Knowledge of God can only come from revelation.' Discuss. [40]",
    thesis:"Natural and revealed knowledge work in concert. Reason establishes that there is a God; revelation tells us who that God personally is. Barth's rejection of natural theology overcorrects; Aquinas' integration remains the most coherent position.",
    paragraphs:[
      { topic:"Natural theology", scholars:["Aquinas (Five Ways)","Calvin (sensus divinitatis)","Paley"], argument:"Romans 1:20: God's invisible attributes 'clearly seen' from creation. Aquinas: reason can demonstrate God's existence; revelation needed for the rest.", counter:"Barth: natural theology was abused by Nazi-sympathetic theologians; we cannot know God apart from Christ.", response:"Barth overcorrects; the abuse doesn't prove the impossibility." },
      { topic:"Revealed theology", scholars:["Karl Barth","John 14:9"], argument:"'He who has seen me has seen the Father' (John 14:9). Christ is the full revelation. Faith and grace are the ground of knowing God personally.", counter:"This conflicts with billions who have never heard the gospel.", response:"Rahner's anonymous Christians extends grace to those reached by natural revelation." },
      { topic:"The Fall and knowledge", scholars:["Aquinas","Calvin","Barth"], argument:"Aquinas: natural knowledge persists but is distorted. Calvin: sensus divinitatis persists but is corrupted. Barth: natural knowledge is impossible.", counter:"Aquinas' middle position is most defensible.", response:"Universal human religiosity supports it; we have something distorted, not nothing." }
    ],
    conclusion:"Knowledge of God comes from both natural reasoning AND revelation. Reason gets us to a transcendent first cause; revelation tells us who that cause is personally. Pure exclusivism (Barth) is indefensible given divine justice." },

  /* --- Jesus Christ --- */
  { id:"jesus-wisdom-teacher", paper:"03", topic:"Person of Jesus Christ",
    question:"'Jesus was no more than a teacher of wisdom.' Discuss. [40]",
    thesis:"Jesus was all three: liberator in his mission, teacher in his ethics, Son of God in the faith-claim of the Church. Picking one impoverishes the other two. Wisdom-teacher alone loses the metaphysical and political stakes that give his ethics force.",
    paragraphs:[
      { topic:"The teacher view", scholars:["Gandhi (sympathetic)","Tolstoy","modern liberals"], argument:"Take Jesus' ethics (Sermon on the Mount, parables) without divinity claims. Avoid metaphysics; keep the morality. Sympathetic non-Christians admire him this way.", counter:"This loses what classical Christianity finds most important: forgiveness of sin, defeat of death, new creation.", response:"Wisdom-teacher-only Jesus is historically reduced and theologically inadequate." },
      { topic:"Son of God claim", scholars:["E.P. Sanders","C.S. Lewis (liar/lord/lunatic)","Chalcedon"], argument:"Gospel claims (John 8:58 'before Abraham was, I am'), miracles, resurrection. Lewis: cannot be just a great moral teacher; must be liar, lunatic, or Lord.", counter:"Gospels are post-resurrection theology; may not reflect Jesus' own self-understanding (Sanders).", response:"Even allowing this, the early church's claim is not arbitrary — something distinctive happened." },
      { topic:"Liberator", scholars:["Gutiérrez","Sobrino","liberation theology"], argument:"Jesus' social radicalism is historically well-attested. Execution by Rome is not accidental — political troublemaker. Luke 4:18: 'good news to the poor.'", counter:"This secularises Jesus.", response:"Responsible liberation theology holds divinity and liberation together; both are needed." }
    ],
    conclusion:"Jesus was wisdom-teacher AND liberator AND Son of God. Wisdom-teacher alone is theologically thin; Son of God alone risks depoliticising; liberator alone loses metaphysics. The whole is the answer." },

  { id:"jesus-political", paper:"03", topic:"Person of Jesus Christ",
    question:"'Jesus was primarily a political liberator.' Discuss. [40]",
    thesis:"Jesus' political dimension is genuine but not primary. Liberation theology rightly recovers what conventional theology had buried, but responsible Christology holds the political alongside the soteriological and metaphysical — not as substitute.",
    paragraphs:[
      { topic:"Political evidence", scholars:["Gutiérrez","Sobrino","historical Jesus scholarship"], argument:"Roman execution by crucifixion = political; cleansing of Temple; identification with poor and marginalised; Luke 4:18 Nazareth manifesto. Liberation theology recovers this.", counter:"Jesus also taught love of enemies, paying taxes, focus on inner transformation.", response:"His politics is non-conventional but politically substantive." },
      { topic:"Soteriological dimension", scholars:["Pauline epistles","Athanasius (De Incarnatione)","early Christianity"], argument:"Early Christianity proclaimed risen Christ as Lord, focus on resurrection and forgiveness, not just liberation. Paul barely mentions Jesus' political teaching.", counter:"Paul also shaped a community that defied Roman religion.", response:"True, but the political defiance was theologically grounded, not vice versa." },
      { topic:"Both / and", scholars:["Moltmann (Crucified God)","liberation theology in dialogue with traditional Christology"], argument:"Mature Christology holds political-liberator together with cosmic-redeemer. Moltmann: God's solidarity with godforsaken in Christ is BOTH political AND metaphysical.", counter:"This still privileges metaphysics.", response:"It refuses to privilege EITHER — refuses the dichotomy." }
    ],
    conclusion:"Jesus was a political liberator, but not primarily. Liberation theology rightly recovers his political dimension; responsible Christology holds it together with the soteriological. The 'primarily' claim is reductive." },

  /* --- Christian Moral Principles --- */
  { id:"bible-only-authority", paper:"03", topic:"Christian Moral Principles",
    question:"'The Bible is the only authority Christians need on moral issues.' Discuss. [40]",
    thesis:"Christian ethics requires the threefold authority of scripture, tradition, and reason, integrated by love. Sola scriptura cannot interpret itself without smuggling in tradition; reason and ecclesial discernment are inescapable.",
    paragraphs:[
      { topic:"Sola scriptura", scholars:["Luther","Westminster Confession","modern evangelicals"], argument:"Scripture is the sufficient, clear, final authority. Tradition is fallible; reason is corrupted by sin; only the Word is trustworthy.", counter:"Bible speaks with many voices (Old vs New Testament, Paul vs James). Which strand is normative?", response:"'Scripture interpreting scripture' — but this requires an interpretative principle scripture itself can't supply." },
      { topic:"Catholic synthesis", scholars:["Aquinas","Vatican II","modern Catholic teaching"], argument:"Scripture is authoritative but requires interpretation (magisterium) and complementary reason (natural law). The three together discern God's will.", counter:"The magisterium has been historically wrong (slavery, anti-Semitism, indulgences).", response:"Catholic teaching has developed and corrected itself; this is a feature, not a bug." },
      { topic:"Agape alone", scholars:["Fletcher","Robinson"], argument:"Jesus' summary of the law (Mark 12:29-31) makes love the whole law. Paul: 'love is the fulfilling of the law'.", counter:"Jesus also gave specific commands; Paul gave detailed rules.", response:"Reducing all to 'love' is selective; love alone is too thin to generate determinate ethics." }
    ],
    conclusion:"Christian ethics needs scripture, tradition, AND reason, integrated by love. Sola scriptura is incoherent (always smuggles tradition); agape alone is too thin; tradition alone is corruptible. The three together are the mature Christian ethic." },

  /* --- Bonhoeffer --- */
  { id:"bonhoeffer-disobedience", paper:"03", topic:"Bonhoeffer",
    question:"'Christians should practise civil disobedience.' Discuss with reference to Bonhoeffer. [40]",
    thesis:"Bonhoeffer's witness shows that costly civil disobedience is sometimes required by Christian discipleship, but this is exceptional, not routine. The conditions (state demanding what God forbids, exhausted legitimate options) are stringent; reckless disobedience is not the same as Bonhoeffer's witness.",
    paragraphs:[
      { topic:"Bonhoeffer's case", scholars:["Bonhoeffer (Cost of Discipleship)","Barmen Declaration"], argument:"Lutheran tradition (Romans 13) emphasised obedience to authority. Bonhoeffer: this is conditional. When state demands what God forbids, civil disobedience is required. Joined plot to assassinate Hitler.", counter:"Killing a head of state is more than civil disobedience.", response:"Bonhoeffer accepted this — tragic moral realism. Even necessary actions can be sinful; he asked forgiveness." },
      { topic:"Conditions for disobedience", scholars:["Aquinas (just war theory)","Bonhoeffer's threshold"], argument:"Required: serious harm being done by state; legitimate channels exhausted; proportionate response; willingness to accept consequences.", counter:"In democracies, most political disagreements meet none of these.", response:"Precisely — Bonhoeffer's witness doesn't license casual civil disobedience; it's reserved for genuine moral emergency." },
      { topic:"Modern applications", scholars:["Civil rights movement","Hauerwas","liberation theology"], argument:"Christian civil disobedience in apartheid, Jim Crow, against unjust wars. Bonhoeffer's witness inspires.", counter:"Some appeals to Bonhoeffer (e.g., abortion clinic violence) misuse him.", response:"Disciplined application requires Bonhoeffer's discernment, not just his example." }
    ],
    conclusion:"Christians should practise civil disobedience when state demands what God forbids and legitimate options are exhausted — Bonhoeffer's witness. But the conditions are stringent; routine disobedience misuses his memory." },

  { id:"costly-grace", paper:"03", topic:"Bonhoeffer",
    question:"'Bonhoeffer's concept of costly grace is more theological than practical.' Discuss. [40]",
    thesis:"Costly grace is both theological and practical — that's the point. Bonhoeffer's theological move (grace that calls to discipleship) IS a practical reform (against comfortable Christianity). The dichotomy is false.",
    paragraphs:[
      { topic:"The theological move", scholars:["Bonhoeffer (Cost of Discipleship)"], argument:"Cheap grace: grace without discipleship, forgiveness without repentance, baptism without church discipline. Costly grace: grace that calls us to follow Jesus, even to death.", counter:"This is critique of Lutheran piety, not original theology.", response:"It's a recovery of Reformation depth — Luther's grace was always costly. Bonhoeffer renews it." },
      { topic:"Practical implications", scholars:["Finkenwalde","Confessing Church","Life Together"], argument:"Bonhoeffer ran the illegal Finkenwalde seminary; co-founded Confessing Church; joined Hitler plot. Practical implications are concrete and lived.", counter:"His specific practical witness was contextual to Nazism.", response:"Costly grace remains practically demanding wherever Christianity becomes comfortable." },
      { topic:"Modern relevance", scholars:["Hauerwas","modern Christian witness"], argument:"Hauerwas: American Christianity has become cheap grace par excellence. Bonhoeffer's challenge is universal.", counter:"This makes his theology a critique of modernity rather than constructive.", response:"It's both — critique and call to renewed discipleship." }
    ],
    conclusion:"Costly grace is both theological and practical. Bonhoeffer's witness IS the proof: his theology was his life. The dichotomy between theological and practical is the kind of comfortable distinction his ethics rejects." },

  /* --- Religious Pluralism Theology --- */
  { id:"christianity-equally-valid", paper:"03", topic:"Religious Pluralism (Theology)",
    question:"'Christianity can never accept other religions as equally valid paths to God.' Discuss. [40]",
    thesis:"Inclusivism is the only defensible Christian position. Exclusivism fails morally (damns billions); pluralism fails theologically (reduces Christ to one option). Rahner's anonymous Christians holds Christ's uniqueness AND God's universal salvific will.",
    paragraphs:[
      { topic:"Exclusivism", scholars:["Cyprian ('extra ecclesiam')","Karl Barth","traditional evangelicals"], argument:"Only explicit faith in Christ saves (John 14:6, Acts 4:12). Christianity is the unique path; others are at best inadequate.", counter:"Damns billions who never heard the gospel — incompatible with divine love and justice.", response:"This is morally untenable for serious modern Christianity." },
      { topic:"Pluralism", scholars:["Hick","Knitter"], argument:"All major religions are equally valid responses to the same transcendent reality (the Real). Christianity is one culturally-conditioned revelation among many. Copernican revolution.", counter:"Reduces Christ to just one option among many; conflicts with Christian particularity.", response:"Hick: cultural particularity doesn't undermine universal truth-claim." },
      { topic:"Inclusivism", scholars:["Karl Rahner (anonymous Christians)","Vatican II (Nostra Aetate)","Gavin D'Costa"], argument:"Christianity is the normative path; other religions contain truth and grace but are fulfilled in Christ. Sincere non-Christians can be 'anonymous Christians.'", counter:"Patronising — Muslims don't want to be called anonymous Christians.", response:"This is what every tradition does when it thinks about others; Rahner is just explicit." }
    ],
    conclusion:"Christianity cannot accept other religions as equally valid (pluralism fails theologically); but it cannot say they offer nothing (exclusivism fails morally). Inclusivism is the only defensible middle: Christ's uniqueness AND God's universal will." },

  /* --- Religious Pluralism Society --- */
  { id:"interfaith-cohesion", paper:"03", topic:"Religious Pluralism (Society)",
    question:"'Inter-faith dialogue has contributed little to social cohesion.' Discuss. [40]",
    thesis:"Inter-faith dialogue has contributed substantively to social cohesion — reduced caricature, joint action on poverty and racism, sustained relationships — but it has limits: it occurs mostly among the theologically committed, not the ordinary faithful.",
    paragraphs:[
      { topic:"Achievements", scholars:["Lesslie Newbigin","David Ford (Scriptural Reasoning)","Vatican II"], argument:"Nostra Aetate transformed Catholic relations with Judaism. Scriptural Reasoning (Ford, Ochs): Jews, Christians, Muslims study scriptures together. Reduced caricature, joint action.", counter:"These achievements are within scholarly circles.", response:"But scholarship shapes pulpit and pastoral training, which reaches congregations." },
      { topic:"Limits", scholars:["Tariq Ramadan","communal tensions in Europe and South Asia"], argument:"Dialogue often happens among the already committed. Rising tensions between Hindu nationalism and minorities, Muslim/Western relations show dialogue has limits.", counter:"Without dialogue, tensions would be worse.", response:"Probably true but unverifiable. Dialogue is necessary, not sufficient." },
      { topic:"Mission and dialogue", scholars:["Newbigin (Gospel in a Pluralist Society)","Rowan Williams"], argument:"Dialogue isn't substitute for mission; it's the new form. Witness without coercion; respect for conscience while sharing one's tradition.", counter:"This conflicts with confessional traditions that emphasise conversion.", response:"All traditions are working out how to relate; dialogue is the live front." }
    ],
    conclusion:"Inter-faith dialogue has contributed substantially to social cohesion among the educated, less so at popular level. Its limits are real but its achievements are also real. The alternative — silence or collision — is worse." },

  /* --- Gender Society --- */
  { id:"gender-resist-secular", paper:"03", topic:"Gender and Society",
    question:"'Christian teaching should resist current secular views on gender.' Discuss. [40]",
    thesis:"Christian teaching should resist the bad parts of secular gender views (uncritical individualism, rejection of bodily reality) and embrace the good parts (equal dignity, opposition to patriarchy). Resistance and learning are not opposites.",
    paragraphs:[
      { topic:"Traditional Christian teaching", scholars:["Pauline epistles (Ephesians 5)","John Paul II (Mulieris Dignitatem)"], argument:"Complementarity of male and female; male headship in family and church; women's distinctive 'feminine genius'. Equal dignity but distinct roles.", counter:"Pauline texts on slavery rejected as cultural; gender texts should be too.", response:"John Paul II tried to update without abandoning core; success contested." },
      { topic:"Secular feminism", scholars:["de Beauvoir ('one is not born, but becomes, a woman')","Judith Butler (Gender Trouble)"], argument:"Gender as social construction; opposition to patriarchy; equal rights and opportunities. Significant moral progress.", counter:"Christianity contributed historically to gender equality (Galatians 3:28, women's rights movements).", response:"Christianity has been both source and obstacle; this is mixed history." },
      { topic:"Convergence and conflict", scholars:["Mainline Protestant women's ordination","Catholic distinctive teaching","Coakley"], argument:"Mainline Protestants embraced equal ordination; Catholic Church distinctive. Sarah Coakley recovers contemplative theology with feminist insight.", counter:"On trans questions, abortion, family redefinition, Christian teaching and secular feminism diverge sharply.", response:"On these specific issues, critical Christian engagement (not rejection) is appropriate." }
    ],
    conclusion:"Christian teaching should resist some secular gender views (extreme constructivism, autonomy-only ethics) but embrace others (equal dignity, opposition to patriarchy). Wholesale resistance is reactionary; wholesale embrace is uncritical. Discernment is required." },

  /* --- Gender Theology --- */
  { id:"christianity-sexist", paper:"03", topic:"Gender and Theology",
    question:"'Christianity is essentially sexist.' Discuss. [40]",
    thesis:"Christianity is historically patriarchal but not essentially so. Daly's exit proves too much (would condemn every world religion); Ruether's reform is borne out by actual transformation of mainline Christianity.",
    paragraphs:[
      { topic:"Daly's case", scholars:["Mary Daly ('if God is male, then the male is God')","Trible (texts of terror)"], argument:"Male Father-God, male Son, male priesthood — Christianity sanctifies patriarchy at the level of structure, not accident. Witch-hunts, denial of ordination, biblical violence against women.", counter:"Other religions also use male language for God.", response:"If Daly is right, all those religions are also unreformable. She singles out Christianity unfairly." },
      { topic:"Ruether's reform", scholars:["Ruether (Sexism and God-Talk)","Elizabeth Johnson (She Who Is)","Wisdom tradition (Proverbs 8)"], argument:"Christianity contains prophetic resources against its own deformations. Jesus' practice with women; Wisdom feminine in personification; Mary Magdalene first witness of resurrection.", counter:"Institution has been slow to embody these.", response:"But it is embodying them: women's ordination, inclusive liturgy, feminist scholarship are facts of last 50 years." },
      { topic:"Christ's maleness", scholars:["Gregory of Nazianzus ('what is not assumed is not redeemed')","Catholic teaching"], argument:"Catholic teaching: priest acts in persona Christi; therefore male. Critics: this confuses biological maleness with theological humanity.", counter:"Maleness is theologically meaningful.", response:"If maleness is salvifically necessary, salvation of women is undermined. Ruether's view is the only coherent one." }
    ],
    conclusion:"Christianity is not essentially sexist. Daly's exit proves too much; Ruether's reform is borne out by visible transformation. What remains essential is incarnation and imago Dei; what falls away is contingent patriarchy." },

  /* --- Secularism --- */
  { id:"christianity-public-life", paper:"03", topic:"Secularism",
    question:"'Christianity has no place in public life.' Discuss. [40]",
    thesis:"Christianity has a legitimate place in public life as one tradition among others — not as state establishment, not as privileged authority, but as participant in democratic deliberation. Wholesale privatisation impoverishes both Christianity and public life.",
    paragraphs:[
      { topic:"Secular humanist case", scholars:["Dawkins","Hitchens","secular humanists"], argument:"Religion should be private. State should be neutral. No faith schools, no religious lords, no privileged authority. Public reason should be accessible to all.", counter:"Rawls himself softened on this; secular doesn't mean atheist by default.", response:"Public reason can include religious voices as long as they translate into broadly accessible terms." },
      { topic:"Privatisation impoverishes", scholars:["Rowan Williams (Faith in the Public Square)","Charles Taylor (A Secular Age)"], argument:"Christianity has contributed to abolition of slavery, civil rights, welfare state, debt relief. Silencing it impoverishes public debate. Taylor: secularism is itself a specific tradition, not neutral.", counter:"Christianity has also justified slavery, colonialism, persecution.", response:"True — religion is double-edged. Same is true of secularism (Soviet atheism). The answer is engagement, not silence." },
      { topic:"Disestablishment", scholars:["Hauerwas","modern Anglicans"], argument:"Some Christians (Hauerwas) actually welcome disestablishment — frees Christianity from co-option by state power.", counter:"This is a Christian argument for secularism.", response:"It's an argument for *one form* of secularism — not the privatising form, but the form that lets religion be itself." }
    ],
    conclusion:"Christianity has a legitimate place in public life: not as establishment or privileged authority, but as one voice in democratic deliberation. Wholesale privatisation impoverishes both Christianity and public discourse." },

  { id:"freud-illusion", paper:"03", topic:"Secularism",
    question:"'Freud showed religion to be an illusion.' Discuss. [40]",
    thesis:"Freud showed that religion CAN be illusion (wish-fulfilment), not that it IS. His account is psychologically powerful but methodologically self-refuting — wish-fulfilment explains belief AND disbelief equally, so explains nothing specific about religion.",
    paragraphs:[
      { topic:"Freud's case", scholars:["Freud (Future of an Illusion)","Civilization and its Discontents"], argument:"Religion as cosmic father-projection; infantile dependence; collective neurosis. Will be outgrown as humanity matures with science.", counter:"This is a hypothesis, not a proof.", response:"Freud presents it as scientific psychology, but it functions as worldview-assertion." },
      { topic:"The self-refutation", scholars:["Vitz (Faith of the Fatherless)","critics of Freud"], argument:"If wish-fulfilment explains religious belief (wishing for a father), it equally explains atheism (wishing for no judgement). Theory explains everything, therefore nothing specific.", counter:"Wish-fulfilment doesn't claim to explain everything — only to identify a mechanism that may apply.", response:"But the explanatory power Freud claims is precisely the one undermined by symmetry." },
      { topic:"What survives", scholars:["Dawkins","Hitchens","McGrath"], argument:"Modern atheists (Dawkins, Hitchens) extend Freud — religion not just illusion but harmful. McGrath: their arguments are weak; Eagleton: 'Tintin in the Congo' theology.", counter:"Even weak versions raise serious questions about religious experience.", response:"Yes — but the questions are honest curiosity, not refutation. Freud opened a conversation; he didn't close it." }
    ],
    conclusion:"Freud showed religion CAN be illusion but not that it IS. His wish-fulfilment theory is psychologically powerful but methodologically self-refuting. Religion as illusion is a possibility, not a demonstration." },

  /* --- Liberation Theology --- */
  { id:"marx-engagement", paper:"03", topic:"Liberation Theology and Marx",
    question:"'Christian theology should not engage with Marxist ideology.' Discuss. [40]",
    thesis:"Christian theology should engage with Marxist ideology as Aquinas engaged with Aristotle — selectively, as diagnostic tool rather than master worldview. Pope Francis' rehabilitation of liberation theology confirms the engagement is fruitful.",
    paragraphs:[
      { topic:"Liberation theology's use of Marx", scholars:["Gutiérrez (A Theology of Liberation)","Boff (orthopraxis)","Sobrino"], argument:"Marx's analysis of alienation and exploitation diagnoses Latin American poverty. Combined with biblical themes of liberation (Exodus, Magnificat, Luke 4), produces structural sin and preferential option for the poor.", counter:"Marxism is atheistic; engagement imports atheism.", response:"The methodology (class analysis) is separable from the metaphysics. Aquinas used Aristotle's logic without his cosmology." },
      { topic:"Ratzinger's caution, Francis' rehabilitation", scholars:["Joseph Ratzinger (1984 Instruction)","Pope Francis (Evangelii Gaudium)"], argument:"1984 Vatican Instruction warned liberation theology risked reducing Christianity to political ideology. 1986 follow-up recognised legitimate insights. Francis has rehabilitated liberation themes.", counter:"Francis is controversial.", response:"Preferential option for the poor is now mainstream Catholic teaching. Engagement has been tested and survived." },
      { topic:"Distinctive Christian contribution", scholars:["Romero (martyred 1980, canonised 2018)","Cone (Black liberation theology)"], argument:"Liberation theology's restraint on violence (vs Marx) and grounding of justice in imago Dei (vs materialism) are theological achievements, not Marxist ones.", counter:"Critics: liberation theology blesses revolutionary violence (Camilo Torres).", response:"Mainstream tradition rejected violence in favour of non-violent solidarity." }
    ],
    conclusion:"Christian theology should engage with Marxist ideology selectively, with discrimination. Pope Francis' rehabilitation of liberation themes confirms: the engagement was right. Engagement is not capitulation." },

  { id:"preferential-option", paper:"03", topic:"Liberation Theology and Marx",
    question:"'The preferential option for the poor is a Marxist idea, not a Christian one.' Discuss. [40]",
    thesis:"The preferential option for the poor has both Marxist and Christian roots, but the Christian roots are deeper and earlier. Marx influenced its modern articulation but the substance is biblical and patristic.",
    paragraphs:[
      { topic:"Biblical and patristic roots", scholars:["Luke 4:18","Magnificat","Basil the Great","Chrysostom"], argument:"'Good news to the poor' (Luke 4:18); Mary's Magnificat ('he has filled the hungry'); patristic teaching on private property as theft. The preferential option has biblical and patristic precedent.", counter:"These weren't 'preferential option' as articulated post-Vatican II.", response:"True — Marxist analysis sharpened it. But the substance is older and Christian." },
      { topic:"Marxist contribution", scholars:["Marx","Gutiérrez"], argument:"Marx provided the structural-sin analytical framework. Gutiérrez integrated it with biblical themes. Liberation theology's distinctive contribution is the synthesis.", counter:"Without Marx, the modern doctrine wouldn't exist in present form.", response:"True — but the same is true of many modern doctrines (Aquinas needed Aristotle). Borrowing intellectual tools doesn't change ownership of the underlying claim." },
      { topic:"Catholic teaching now", scholars:["Pope Francis","Catechism of the Catholic Church"], argument:"Preferential option for the poor is now mainstream Catholic teaching, taught alongside other social principles. Francis has emphasised it.", counter:"This is post-Vatican II, post-Marx — not 'ancient' tradition.", response:"Doctrines develop. Trinity was articulated centuries after New Testament; preferential option is no different." }
    ],
    conclusion:"The preferential option for the poor has Marxist analytical roots but Christian substantive roots. Gutiérrez's synthesis is distinctive; the substance is biblical. Calling it 'Marxist' confuses analytical influence with substantive origin." },

  /* =========================================================================
     ADDITIONAL PLANS — broader coverage of all topics
     ========================================================================= */

  /* Paper 01 extras */
  { id:"cave-allegory", paper:"01", topic:"Ancient Philosophical Influences",
    question:"'The Cave is a convincing analogy for our condition.' Discuss. [40]",
    thesis:"The Cave persuades only those sympathetic to Platonic dualism. Its rhetorical power exceeds its argumentative force; modern epistemology offers better tools for thinking about appearance and reality.",
    paragraphs:[
      { topic:"The analogy", scholars:["Plato (Republic VII)"], argument:"Prisoners mistake shadows for reality; one escapes, sees the sun (Form of the Good), returns and is ridiculed. Dramatises philosopher's ascent.", counter:"Begs the question — assumes there IS a sun (Forms) beyond the shadows.", response:"Plato: the philosopher's experience is the warrant; literature here, not proof." },
      { topic:"Strengths", scholars:["Murdoch (Sovereignty of Good)","Platonic tradition"], argument:"Captures real phenomena: ideology, self-deception, intellectual conversion. Murdoch reads it as moral psychology, not just metaphysics.", counter:"Doesn't help us tell shadows from reality in practice.", response:"It's diagnostic, not prescriptive." },
      { topic:"Modern critiques", scholars:["Aristotle","Foucault","modern epistemology"], argument:"Aristotle: empirical investigation, not metaphysical ascent. Foucault: 'reality' may itself be ideological. Modern epistemology: probabilistic and incremental.", counter:"These critiques presuppose what they reject (some access to truth).", response:"They limit the scope — we make progress within phenomena, not by escape from them." }
    ],
    conclusion:"The Cave is rhetorically powerful but argumentatively limited. It captures phenomena modern epistemology theorizes more rigorously. Convincing only if Platonism is already granted." },

  { id:"prime-mover-cosmological", paper:"01", topic:"Arguments from Observation",
    question:"'Aristotle's Prime Mover is essentially the same argument as Aquinas' First Way.' Discuss. [40]",
    thesis:"Aquinas' First Way is structurally similar to Aristotle's Prime Mover but transformed by Christian assumptions about creation ex nihilo. The similarity is real but the conclusions are different in kind.",
    paragraphs:[
      { topic:"Structural similarity", scholars:["Aristotle","Aquinas"], argument:"Both argue from observed change to a non-changing source. Both reject infinite regress. Both arrive at pure actuality.", counter:"Aristotle's Prime Mover is contemplator; Aquinas' is creator.", response:"True — but the inference pattern is shared." },
      { topic:"Transformations", scholars:["Aquinas","Christian theology"], argument:"Aquinas adds creation ex nihilo, providence, personal relations, omnipotence. The Prime Mover becomes God.", counter:"These additions require revelation, not reason.", response:"Aquinas claims reason gets to God; revelation specifies which God." },
      { topic:"The personal God gap", scholars:["Hume","Russell"], argument:"Even granting an Unmoved Mover, why personal? Why loving? Hume's gaps remain.", counter:"The combined Five Ways narrow the gap.", response:"They narrow but don't close it. Revelation is still needed for the Christian God." }
    ],
    conclusion:"Aquinas' First Way borrows Aristotle's structure but adds Christian content. The argument's empirical core is Aristotle's; its theological conclusion is uniquely Christian. Similar but not identical." },

  { id:"freud-religious-experience", paper:"01", topic:"Religious Experience",
    question:"'Religious experience is reducible to psychology.' Discuss. [40]",
    thesis:"Religious experience has psychological dimensions but is not reducible to psychology. Freudian wish-fulfilment is self-refuting (explains belief and disbelief symmetrically); Persinger's temporal-lobe stimulation doesn't settle whether experiences have referents.",
    paragraphs:[
      { topic:"Psychological accounts", scholars:["Freud","Marx","Persinger"], argument:"Freud: wish-fulfilment, projection of father. Marx: opium of the people. Persinger: temporal-lobe stimulation produces 'sensed presence' effects.", counter:"These show experiences CAN be produced psychologically, not that they ALWAYS are.", response:"Reductionist would need to show experiences MUST be psychological in all cases." },
      { topic:"Limits of reduction", scholars:["Swinburne","Otto","James"], argument:"Swinburne: experiences have prima facie evidential weight unless defeated. Otto: numinous distinct from psychological. James: judge by fruits.", counter:"Subjective conviction is poor evidence.", response:"But Swinburne's principle of credulity applies generally — undermines if applied selectively to religious cases." },
      { topic:"Causal mechanism doesn't settle veridicality", scholars:["philosophical reflection on perception"], argument:"Neurology of vision doesn't tell us whether trees exist. Similarly, neurology of religious experience doesn't tell us whether God exists.", counter:"But trees are independently verifiable; God isn't.", response:"True, but this is a verification question, not a reduction question." }
    ],
    conclusion:"Religious experience is not reducible to psychology. Psychological accounts identify mechanisms but don't settle veridicality. Reduction overreaches; serious assessment requires philosophical, not just psychological, analysis." },

  { id:"divine-attributes-coherent", paper:"01", topic:"Nature of God",
    question:"'The traditional divine attributes are mutually incompatible.' Discuss. [40]",
    thesis:"The traditional attributes (omnipotence, omniscience, omnibenevolence, eternity) face tensions but are not strictly incompatible if carefully formulated. Aquinas' classical theism manages them; Swinburne's everlasting self-limiting God manages them more accessibly.",
    paragraphs:[
      { topic:"Apparent conflicts", scholars:["Mackie (inconsistent triad)","stone paradox"], argument:"Omnipotence/omnibenevolence/evil triad. Stone paradox: can God create a stone too heavy to lift? Omniscience/freedom problem.", counter:"These are puzzles, not refutations.", response:"They require theological work, not abandonment." },
      { topic:"Classical solutions", scholars:["Aquinas","Aquinas (omnipotence as logical possibility)"], argument:"Omnipotence = doing anything logically possible. Omniscience = knowing all knowable. Eternity = atemporal. These solve the puzzles.", counter:"At cost of religious intuitions — atemporal God can't respond to prayer.", response:"Aquinas accepts this; eternal God's responsiveness is logical, not temporal." },
      { topic:"Swinburne's modifications", scholars:["Swinburne","modern theism"], argument:"God is everlasting (in time), voluntarily limits foreknowledge of free actions. Preserves classical attributes in modified form.", counter:"Sacrifices classical purity.", response:"But more religiously recognisable. The choice is between classical purity and religious accessibility." }
    ],
    conclusion:"The attributes are not strictly incompatible but require careful formulation. Aquinas preserves classical purity; Swinburne offers more accessible reformulation. Both are coherent; neither is naive." },

  { id:"ineffability", paper:"01", topic:"Religious Language (Negative/Analogical/Symbolic)",
    question:"'If God is truly transcendent, religious language must be meaningless.' Discuss. [40]",
    thesis:"Transcendence doesn't require meaninglessness. Aquinas' analogy shows how creatures can speak of transcendent reality without literal predication. Pure ineffability is incoherent — even claiming God is ineffable is to say something about God.",
    paragraphs:[
      { topic:"The transcendence problem", scholars:["Pseudo-Dionysius","Maimonides","Hindu Brahman"], argument:"If God is wholly other, our finite categories don't apply. We can't even say God 'exists' (existence is a creaturely category).", counter:"This collapses into agnosticism.", response:"Mystical traditions accept this — 'God beyond God' (Tillich)." },
      { topic:"Self-refutation", scholars:["Davies","critics of negative theology"], argument:"Claiming 'God is ineffable' IS saying something about God. Pure negative theology refutes itself.", counter:"Negative theology can be a discipline, not absolute.", response:"Then it isn't strictly transcendent — some predication is granted." },
      { topic:"Aquinas' analogy as solution", scholars:["Aquinas","analogy of being"], argument:"Analogy of attribution: 'good' applies to God and creatures with related but not identical meaning. Preserves transcendence AND meaningful predication.", counter:"Analogy still requires some shared semantic core.", response:"Aquinas: the core is real but partial — sufficient for meaningful theology, insufficient for grasping divine essence." }
    ],
    conclusion:"Transcendence doesn't require meaninglessness. Pure ineffability is self-refuting; analogy preserves both transcendence and meaningful theology. Religious language is not pure description, but it is not meaningless either." },

  { id:"mitchell-falsification", paper:"01", topic:"Religious Language (20th Century)",
    question:"'Mitchell's partisan parable shows religious language is meaningful.' Discuss. [40]",
    thesis:"Mitchell shows religious language CAN be meaningful even when not strictly falsifiable, by being qualified rather than abandoned in the face of counter-evidence. His parable captures how sophisticated religious belief actually functions.",
    paragraphs:[
      { topic:"The parable", scholars:["Basil Mitchell ('Theology and Falsification')"], argument:"Resistance fighter meets a Stranger claiming to be partisan leader. Sees him both helping and apparently betraying the resistance. Continues to trust but is troubled. Faith is qualified by but not surrendered to evidence.", counter:"Flew: this is 'death by qualifications'.", response:"Mitchell: differs from Flew's gardener because the partisan IS still meaningful and could in principle be falsified." },
      { topic:"Strengths", scholars:["Mitchell","Hick","modern philosophers of religion"], argument:"Captures actual religious belief — believers do treat suffering as a problem to be addressed, not dismissed. Belief is genuinely qualified by evidence.", counter:"This still doesn't make the belief verifiable.", response:"Verification was always too strong a criterion. Meaning isn't verification." },
      { topic:"Limits", scholars:["Flew","modern non-cognitivists"], argument:"Flew's challenge survives — at what point would a religious believer accept their belief is false? If never, Mitchell hasn't really answered.", counter:"Mitchell: trust can be eschatologically vindicated; partisan resolves at end of war.", response:"This pushes verifiability to eschaton — preserves meaning but at a cost." }
    ],
    conclusion:"Mitchell shows religious language is meaningful even when not strictly falsifiable. Faith is rationally qualified by evidence without being surrendered to it. The cost is eschatological postponement of verification — but meaning is preserved." },

  /* Paper 02 extras */
  { id:"natural-law-modern", paper:"02", topic:"Natural Law",
    question:"'Finnis' new natural law successfully updates Aquinas.' Discuss. [40]",
    thesis:"Finnis' new natural law preserves Aquinas' framework while sidestepping the biological telos problem, but at a cost: the resulting theory is rationalist intuitionism with little remaining of the 'natural'. The update is successful within Catholic ethics but doesn't restore natural law's universal claim.",
    paragraphs:[
      { topic:"Finnis' modifications", scholars:["Finnis (Natural Law and Natural Rights)","Grisez"], argument:"Seven basic goods (life, knowledge, play, aesthetic experience, sociability, practical reasonableness, religion) self-evidently grasped by practical reason. No appeal to biological telos.", counter:"How are these 'self-evident'?", response:"Finnis: practical reason recognises them; theological grounding can support but isn't required." },
      { topic:"What's preserved", scholars:["Aquinas","Finnis"], argument:"Deontological structure; objective moral knowledge; absolute prohibitions on killing innocents, lying, contraception, etc. Catholic ethical conclusions preserved.", counter:"Why the same conclusions if the foundation has changed?", response:"Finnis: practical reason converges with traditional Catholic teaching. Not surprising if both track truth." },
      { topic:"What's lost", scholars:["Critics of Finnis"], argument:"The 'natural' in natural law. If basic goods are rationally intuited, the theory is intuitionism. The Aristotelian-Thomist biological grounding is gone.", counter:"Maybe that grounding wasn't essential.", response:"Then natural law's claim to universal natural reason is undermined; it becomes one tradition's rational intuitionism." }
    ],
    conclusion:"Finnis updates Aquinas successfully WITHIN Catholic ethics — preserving conclusions without the biological premise — but the updated theory loses the 'natural' in 'natural law'. It is rationalist intuitionism by another name." },

  { id:"situation-fletcher", paper:"02", topic:"Situation Ethics",
    question:"'Fletcher's agape is too vague to guide ethics.' Discuss. [40]",
    thesis:"Agape is vague enough to need supplementation by rules and virtues, but specific enough to function as a regulative principle. The criticism is fair but overstated; situation ethics fails because of subjectivism, not vagueness alone.",
    paragraphs:[
      { topic:"Agape's content", scholars:["Fletcher","1 Corinthians 13","Augustine"], argument:"Agape: self-giving, unconditional love. Concrete in its biblical exemplification (Jesus' practice; Pauline description). Specific enough to guide.", counter:"How does agape guide me in choosing between two compassionate options?", response:"It doesn't — particular judgement is required. Same is true of any non-rule-based ethic." },
      { topic:"The subjectivity problem", scholars:["Barclay","critics of Fletcher"], argument:"Different agents disagree about what love requires. Without external criteria, agape collapses into 'do what you think is loving' — which is subjectivism.", counter:"Virtue ethics has the same structure.", response:"Virtue ethics gives content (the virtues); 'love' alone is thinner." },
      { topic:"Supplementation", scholars:["Catholic moral theology","Hauerwas"], argument:"Love needs to be filled out by rules, virtues, communal discernment. Pure agape ethics is incomplete.", counter:"Fletcher allowed for rules as guides.", response:"True — but his 'rules as guides' is closer to traditional moral theology than he acknowledged. Pure situation ethics doesn't really exist." }
    ],
    conclusion:"Agape is moderately vague but not uselessly so. The real failure of situation ethics is not vagueness but unrestrained subjectivism. Agape supplemented by rules and virtues works; agape alone does not." },

  { id:"kant-lying", paper:"02", topic:"Kantian Ethics",
    question:"'Kant's prohibition on lying makes his ethics indefensible.' Discuss. [40]",
    thesis:"Kant's specific application to the murderer at the door is indefensible, but the underlying principle (don't lie) survives modern Kantian refinement. Strict Kant fails; flexible Kantianism (O'Neill, Korsgaard) is defensible.",
    paragraphs:[
      { topic:"Kant's argument", scholars:["Kant ('On a Supposed Right to Lie')"], argument:"Lying universalised destroys the institution of truth-telling; it is a contradiction in conception. Always wrong, even to save innocent life.", counter:"This is morally monstrous.", response:"Kant: you are responsible for the lie, not for the murder; consequences belong to the murderer." },
      { topic:"Modern responses", scholars:["Korsgaard","O'Neill"], argument:"Korsgaard: lying is consistent with universalisation under coercion (you're not really in a normal communicative context). Lying to the murderer doesn't fail the test.", counter:"This deviates from Kant's strict view.", response:"It refines Kant rather than abandoning him; preserves the underlying principle." },
      { topic:"What survives", scholars:["Ross (prima facie duties)","modern deontology"], argument:"Pluralist deontology (Ross): truth-telling is one prima facie duty among many. In conflict with preserving life, life wins.", counter:"This isn't strict Kant.", response:"Strict Kant fails; refined Kantianism survives. Most modern Kantians are pluralists in practice." }
    ],
    conclusion:"Kant's specific lying example is indefensible, but the underlying ethics survives in refined forms (Korsgaard, Ross). Wholesale rejection of Kant is wrong; wholesale endorsement of strict Kantianism is too." },

  { id:"utilitarian-justice", paper:"02", topic:"Utilitarianism",
    question:"'The justice problem destroys utilitarianism.' Discuss. [40]",
    thesis:"The justice problem (sheriff, organ harvest) is fatal to utilitarianism as a complete theory of right action but doesn't destroy utilitarianism's usefulness within a framework of rights. Pure utilitarianism is dead; mixed theories (utility + rights) survive.",
    paragraphs:[
      { topic:"The cases", scholars:["Williams (sheriff)","McCloskey (organ harvest)","Rawls"], argument:"Sheriff frames innocent to prevent riot — net utility positive but clearly wrong. Harvest healthy person's organs for five sick patients — same. Utilitarianism cannot resist these conclusions.", counter:"Rule utilitarianism avoids them.", response:"Rule utilitarianism either collapses into act (if rules bend for utility) or stops being utilitarian (if rules are absolute)." },
      { topic:"Defences", scholars:["Hare (two-level)","sophisticated utilitarians"], argument:"Hare: intuitive level uses rules (don't frame innocents); critical level uses calculation. Pragmatically defensible.", counter:"But at critical level, framing IS justified by utility.", response:"Hare accepts this in genuine emergency; restraint comes from epistemic uncertainty about consequences." },
      { topic:"Mixed theories", scholars:["Rawls","Sen (capability approach)","rights-based liberalism"], argument:"Modern political philosophy uses utility as tool within framework of rights. Maximise utility subject to constraints (rights). Best of both.", counter:"Then utilitarianism isn't the master theory.", response:"Right — it survives as instrument, not foundation. Justice problem destroys utilitarian foundationalism, not utilitarian instrumentation." }
    ],
    conclusion:"The justice problem destroys pure utilitarianism but not utilitarianism as instrument. The dead version is foundational; the surviving version is instrumental within rights-based theories. Mature ethics uses both." },

  { id:"euthanasia-autonomy", paper:"02", topic:"Euthanasia",
    question:"'Autonomy is the strongest argument for euthanasia.' Discuss. [40]",
    thesis:"Autonomy is the strongest argument for VOLUNTARY euthanasia but not for euthanasia in general; non-voluntary cases require additional argument. The slippery slope from voluntary to non-voluntary is real but manageable with safeguards.",
    paragraphs:[
      { topic:"Autonomy argument", scholars:["Mill","Glover","modern liberal ethics"], argument:"Competent adults should decide what happens to their bodies. Autonomy grounds medical ethics generally; refusing assisted suicide is paternalism.", counter:"Some choices (suicide) seem to require external scrutiny.", response:"Empirical experience (Oregon, Netherlands) shows competent terminally-ill patients can be assessed reliably." },
      { topic:"Voluntary vs non-voluntary", scholars:["Singer","peter singer's controversial extensions"], argument:"Voluntary euthanasia is autonomy-grounded; non-voluntary (PVS, severely disabled infants) requires different justification (quality of life, best interests). Distinct arguments.", counter:"Slippery slope from voluntary to non-voluntary.", response:"Real concern; safeguards have prevented this in most legalised jurisdictions, but vigilance required." },
      { topic:"Alternative arguments", scholars:["Glover","Rachels","modern bioethics"], argument:"Compassion in the face of unbearable suffering; consistency with current practice (withdrawal of treatment is functionally euthanasia); rejection of vitalism.", counter:"None of these is as strong as autonomy.", response:"They reinforce autonomy in cases where autonomy alone wouldn't be conclusive." }
    ],
    conclusion:"Autonomy is the strongest single argument for voluntary euthanasia, but the case is strengthened by compassion and consistency. Non-voluntary euthanasia requires different (and contested) arguments." },

  { id:"csr-genuine", paper:"02", topic:"Business Ethics",
    question:"'Corporate Social Responsibility is just PR.' Discuss. [40]",
    thesis:"Some CSR is PR; some is genuine. The cynical reduction is unfair to the best practice (Patagonia, Unilever) but accurate about the worst (BP's 'Beyond Petroleum' before Deepwater Horizon). The empirical mix should drive nuanced judgement, not blanket cynicism.",
    paragraphs:[
      { topic:"The cynical case", scholars:["Naomi Klein (No Logo)","critics of CSR"], argument:"BP rebranded 'Beyond Petroleum' before Deepwater Horizon. Big Tobacco's CSR. Fast fashion's worker exploitation despite ethical-sourcing claims. CSR often greenwashing.", counter:"This shows CSR is sometimes PR, not always.", response:"Klein: structural pressures of capitalism make genuine CSR difficult." },
      { topic:"Genuine cases", scholars:["Patagonia","Unilever (Polman era)","Ben and Jerry's"], argument:"Some companies absorb costs for ethical commitments. Patagonia: 'Don't buy this jacket' campaign discouraging consumption. Unilever's Sustainable Living Plan.", counter:"Even these are commercially calculated.", response:"True — and that doesn't make them less real. Profit and ethics can align without ethics being mere PR." },
      { topic:"Discernment, not blanket judgement", scholars:["Carroll (CSR pyramid)","modern business ethics"], argument:"CSR's quality varies. Assess specific cases: are commitments measurable, audited, transparent, structurally enforced? Genuine CSR meets these tests; PR doesn't.", counter:"Most CSR fails these tests.", response:"Then we say so — about that CSR. We don't generalise to all of it." }
    ],
    conclusion:"CSR is sometimes PR, sometimes genuine. Blanket cynicism is unfair to genuine cases; uncritical acceptance is unfair to victims of greenwashing. Discernment is the right ethical attitude." },

  { id:"intuitionism", paper:"02", topic:"Meta-ethics",
    question:"Critically assess intuitionism. [40]",
    thesis:"Intuitionism captures something true (moral intuitions are evidence) but cannot adjudicate between conflicting intuitions or explain moral progress. It is incomplete, not wrong; needs supplementation by reflective equilibrium and naturalist accounts.",
    paragraphs:[
      { topic:"Moore's intuitionism", scholars:["Moore (Principia Ethica)","Ross (The Right and the Good)"], argument:"'Good' is simple, non-natural, indefinable, grasped by intuition. Like 'yellow'. Ross: pluralist version with prima facie duties.", counter:"How do we know our intuitions are reliable?", response:"They are like perceptions — defeasible but evidential." },
      { topic:"The disagreement problem", scholars:["Mackie (error theory)","cultural variation"], argument:"Intuitions vary widely across individuals, cultures, ages. Aristotle's intuitions approved slavery; ours don't. Intuitionism can't adjudicate.", counter:"Reflective equilibrium uses intuitions as data, not authority.", response:"This converts intuitionism into something else — reflective methodology." },
      { topic:"Moral progress", scholars:["modern moral philosophers","reflective equilibrium tradition"], argument:"We've made moral progress (abolition of slavery, women's rights). Intuitionism alone can't explain this — it would be conservative.", counter:"Progress as deeper grasp of stable moral truths intuited imperfectly.", response:"This is a form of moral realism with intuition as access — defensible but not pure intuitionism." }
    ],
    conclusion:"Intuitionism captures the evidential role of moral intuition but cannot stand alone. Needs supplementation by reflective methodology and naturalist accounts. Modern moral realism integrates these — pure intuitionism is incomplete." },

  { id:"super-ego-real", paper:"02", topic:"Conscience",
    question:"'The super-ego is a more useful concept than conscience.' Discuss. [40]",
    thesis:"The super-ego is more useful for clinical psychology; conscience is more useful for moral philosophy. They are partially overlapping concepts addressing different questions. Neither is straightforwardly 'better'.",
    paragraphs:[
      { topic:"Super-ego's utility", scholars:["Freud","modern psychoanalysis","clinical applications"], argument:"Super-ego explains specific phenomena: irrational guilt, scrupulosity, obsessive moral concern. Clinically useful in psychotherapy.", counter:"Doesn't capture moral reasoning, only moral emotion.", response:"Freud didn't claim to — super-ego is one component of personality, not all of morality." },
      { topic:"Conscience's utility", scholars:["Aquinas","Newman","Kohlberg"], argument:"Conscience captures moral reasoning and judgement, not just emotion. Aquinas' synderesis-conscientia distinguishes principle from application. Kohlberg's stages describe development of moral judgement.", counter:"Conscience can be self-deceived.", response:"Same is true of super-ego. Both concepts allow for error." },
      { topic:"Complementarity", scholars:["modern moral psychology","Haidt","Greene"], argument:"Modern moral psychology shows conscience is plural: emotion (super-ego-like) + reasoning (Aquinas-like) + intuition (Haidt) + identity (Taylor).", counter:"This dilutes 'conscience' into many things.", response:"It captures the actual complexity. Super-ego and conscience are complementary lenses." }
    ],
    conclusion:"Super-ego is more useful clinically; conscience is more useful philosophically. Neither replaces the other. Modern moral psychology integrates both." },

  { id:"sex-natural-law-fails", paper:"02", topic:"Sexual Ethics",
    question:"'Natural law's treatment of homosexuality is indefensible.' Discuss. [40]",
    thesis:"Natural law's specific conclusion that homosexual acts are intrinsically wrong cannot be derived from natural reason alone. The argument requires theological premises (procreative-unitive telos) that secular ethics doesn't share; as universal ethics, the conclusion is indefensible.",
    paragraphs:[
      { topic:"The traditional argument", scholars:["Aquinas","Humanae Vitae","Catechism"], argument:"Sex's telos is procreative-unitive within heterosexual marriage. Homosexual acts frustrate this telos; therefore intrinsically disordered.", counter:"Why is biological function morally normative?", response:"Aquinas: God built telos into nature; following nature is following divine ordinance — but this requires the theological premise." },
      { topic:"Internal inconsistencies", scholars:["Curran","Gareth Moore","secular philosophers"], argument:"Catholic teaching permits infertile heterosexual sex but forbids same-sex sex — same biological situation (non-procreative). Selective application reveals motivated reasoning.", counter:"Catholic teaching distinguishes natural infertility from chosen sterility.", response:"But this distinction itself requires theological premises about intention before God, not biological telos." },
      { topic:"Modern Catholic reconsideration", scholars:["Francis ('who am I to judge')","Eugene Rogers","reformed natural law"], argument:"Some Catholic thinkers argue same-sex relationships can fulfill the unitive aspect of sexuality. Pastoral practice has softened.", counter:"This isn't yet doctrine.", response:"Doctrine develops; the trajectory suggests the old position is unsustainable." }
    ],
    conclusion:"Natural law's prohibition on homosexual acts cannot be derived from universal reason alone. Within Catholic theology it remains coherent; as universal ethics, it is indefensible." },

  /* Paper 03 extras */
  { id:"grace-free-will", paper:"03", topic:"Augustine on Human Nature",
    question:"'Augustine's doctrine of grace destroys human freedom.' Discuss. [40]",
    thesis:"Augustine's strong doctrine of grace creates serious tension with libertarian free will but doesn't destroy human responsibility. The compatibilist reading (grace working WITH human nature) preserves agency; the monergist reading (grace as sufficient cause) makes responsibility hard.",
    paragraphs:[
      { topic:"Augustine's account", scholars:["Augustine (On Nature and Grace)","Anti-Pelagian writings"], argument:"Humans cannot will the good without grace; grace is sufficient for salvation; some are elected, others passed over. Strong predestinarian reading.", counter:"If grace determines, in what sense is the human acting?", response:"Augustine: the human still wills, but the will is enabled by grace." },
      { topic:"The Pelagian challenge", scholars:["Pelagius","modern Catholic teaching"], argument:"Pelagius: humans have genuine free will; grace assists but doesn't determine. Augustine: this underestimates fallen will.", counter:"Pelagius preserves responsibility better.", response:"But at cost of underestimating moral failure. Augustine captures something Pelagius misses." },
      { topic:"Compatibilist readings", scholars:["Aquinas","Catholic teaching","Lutheran simul iustus et peccator"], argument:"Aquinas: grace perfects nature, doesn't violate it. God's causation works WITH secondary causes, not against. Preserves both grace and freedom.", counter:"This softens Augustine's stronger formulations.", response:"Necessary softening; strong predestinarianism is hard to reconcile with moral responsibility." }
    ],
    conclusion:"Augustine's grace doctrine doesn't destroy freedom on compatibilist readings, but on strong predestinarian readings it does. The tension is real; Aquinas' compatibilism is the most defensible Christian position." },

  { id:"universalism-coherent", paper:"03", topic:"Death and Afterlife",
    question:"'Universalism is incompatible with biblical Christianity.' Discuss. [40]",
    thesis:"Universalism is in tension with traditional readings of biblical 'eternal' but not strictly incompatible with biblical Christianity. David Bentley Hart's recovery of patristic universalism (Origen, Gregory of Nyssa) shows the position has Christian credentials.",
    paragraphs:[
      { topic:"Biblical objections", scholars:["Matthew 25 (sheep and goats)","Revelation","Lake of fire"], argument:"Matthew 25 distinguishes the saved from the damned. Revelation describes lake of fire. 'Eternal' (aionios) punishment.", counter:"Universalists: 'aionios' means 'of the age' not necessarily eternal duration.", response:"This is contested but textually defensible. Greek 'aionios' is ambiguous." },
      { topic:"Patristic precedent", scholars:["Origen","Gregory of Nyssa","modern universalists (Hart)"], argument:"Apokatastasis: ultimate restoration of all things. Origen, Gregory of Nyssa held versions. Condemned in 553 but earlier patristic tradition supports.", counter:"Council condemnation should settle it.", response:"For Catholic tradition perhaps, but condemnation was political as much as theological; modern Catholic theologians (Balthasar) hope for universal salvation." },
      { topic:"Theological coherence", scholars:["David Bentley Hart (That All Shall Be Saved)","Karl Barth","Moltmann"], argument:"Divine love and omnipotence are incompatible with eternal damnation. God's purposes must finally succeed. Even Barth was tempted toward universalism.", counter:"This makes hell a bluff.", response:"Hart: hell is real but ultimately empty; God's love is unconquerable." }
    ],
    conclusion:"Universalism has Christian credentials (patristic precedent, divine love arguments) even though it strains traditional readings of 'eternal'. It is in tension with but not incompatible with biblical Christianity." },

  { id:"calvin-sensus", paper:"03", topic:"Knowledge of God",
    question:"'Calvin's sensus divinitatis is implausible.' Discuss. [40]",
    thesis:"Calvin's sensus divinitatis as an innate awareness of God is empirically defensible (universal human religiosity is real) but philosophically contested (atheism shows the awareness can be wholly suppressed). Modified versions (Plantinga's properly basic belief) survive.",
    paragraphs:[
      { topic:"Calvin's claim", scholars:["Calvin (Institutes I.3)","Romans 1:18-20"], argument:"All humans have innate awareness of God; atheism is suppression of this awareness, not its absence. Universal human religiosity is the evidence.", counter:"Many cultures and individuals lack religion entirely.", response:"Calvin: that's the suppression — they know but suppress." },
      { topic:"The atheist challenge", scholars:["modern atheists","secular societies"], argument:"Genuine, sincere atheism exists. Some atheists report no felt sense of God at all. 'Suppression' is special pleading.", counter:"Plantinga: properly basic theistic belief can be defeated by inattention or contrary input.", response:"This concedes atheism can be epistemologically reasonable while preserving the structure of Calvin's claim." },
      { topic:"Modified versions", scholars:["Plantinga (Reformed Epistemology)","modern Calvinists"], argument:"Theistic belief is properly basic — like belief in other minds. Doesn't require argument; can be defeated by counter-evidence.", counter:"This is weaker than Calvin's universal claim.", response:"True — but it preserves the structure (innate-like) while accommodating real atheism." }
    ],
    conclusion:"Calvin's strong claim is implausible (universal innate awareness contradicted by sincere atheism); modified versions (Plantinga) are defensible. The sensus divinitatis is at best a tendency, not a faithful internal monitor." },

  { id:"agape-supreme", paper:"03", topic:"Christian Moral Principles",
    question:"'Agape is the supreme Christian moral principle.' Discuss. [40]",
    thesis:"Agape is supreme as the regulative principle that orders all other Christian moral commitments, but not supreme as a stand-alone ethic (Fletcher). Without rules and virtues, agape is too thin to generate determinate action.",
    paragraphs:[
      { topic:"Biblical centrality", scholars:["Mark 12:29-31","1 Corinthians 13","Augustine ('love and do what you will')"], argument:"Jesus' summary of the law: love God and neighbour. Paul: 'love is the fulfilling of the law'. Augustine: love properly ordered fulfills morality.", counter:"This is regulative, not exhaustive.", response:"That's the right reading — agape orders other principles without replacing them." },
      { topic:"Fletcher's overreach", scholars:["Fletcher","Robinson","Barclay"], argument:"Fletcher: agape replaces all rules. Critics: this is too thin; love alone doesn't tell us how to love in specific cases.", counter:"Fletcher allowed rules as 'guides.'", response:"Then his position is closer to traditional moral theology than he admitted." },
      { topic:"Mature Christian ethics", scholars:["Aquinas","Hauerwas","virtue ethics"], argument:"Agape supreme as ordering principle; supplemented by virtues (humility, justice, courage), rules (Decalogue, NT commands), and prudence in application.", counter:"This complicates Jesus' simple summary.", response:"Jesus' simplicity is summary, not exhaustion. The summary doesn't exclude the detail." }
    ],
    conclusion:"Agape is supreme as ordering principle but not as stand-alone ethic. Fletcher's pure situationism is too thin; mature Christian ethics integrates agape with virtues and rules." },

  { id:"bonhoeffer-suffering", paper:"03", topic:"Bonhoeffer",
    question:"'Bonhoeffer's ethics romanticises suffering.' Discuss. [40]",
    thesis:"Bonhoeffer's ethics emphasises suffering as inherent to discipleship without romanticising it. The distinction is between suffering chosen for the sake of others (Christian) and suffering as religious aesthetics (false). Critics often miss this.",
    paragraphs:[
      { topic:"The charge", scholars:["feminist theologians","critics of suffering theology"], argument:"Bonhoeffer's emphasis on 'come and die' can be misused to romanticise victimhood. Battered wives told to 'bear their crosses'. Suffering theology has done real harm.", counter:"This misapplies Bonhoeffer.", response:"Bonhoeffer meant chosen suffering for the neighbour, not tolerating oppression. But the distinction needs explicit teaching." },
      { topic:"Bonhoeffer's actual meaning", scholars:["Bonhoeffer (Cost of Discipleship)","Confessing Church"], argument:"Cost of discipleship is willingness to suffer for the gospel and for the neighbour. Not suffering for its own sake; suffering because following Jesus into solidarity with the oppressed will cost.", counter:"Suffering remains valorised.", response:"Within a clear distinction: solidarity-suffering yes, masochistic suffering no." },
      { topic:"Modern application", scholars:["liberation theology","civil rights movement","Hauerwas"], argument:"Bonhoeffer's witness inspires non-violent resistance, civil rights, anti-apartheid struggle. These are accepted suffering for the sake of others.", counter:"They are also dangerous templates.", response:"Disciplined application requires Bonhoeffer's discernment — not just his example." }
    ],
    conclusion:"Bonhoeffer doesn't romanticise suffering but does emphasise it. The line between Christian solidarity and masochistic religion needs explicit teaching to prevent abuse. Bonhoeffer himself drew it; not all his followers have." },

  { id:"rahner-anonymous", paper:"03", topic:"Religious Pluralism (Theology)",
    question:"'Rahner's anonymous Christians is patronising and incoherent.' Discuss. [40]",
    thesis:"Rahner's anonymous Christians is patronising in label but coherent in substance. Every tradition interprets others from its own standpoint; Rahner is just explicit. Better than exclusivism (which damns) or pluralism (which empties Christ).",
    paragraphs:[
      { topic:"Rahner's position", scholars:["Karl Rahner (Theological Investigations vol.5)","Vatican II (Nostra Aetate)"], argument:"Sincere non-Christians who live by the light they have are responding to Christ's grace implicitly. Their religion is the path the Holy Spirit uses; salvation is through Christ even without naming him.", counter:"Patronising — Muslims don't want to be called anonymous Christians.", response:"Patronisation is in the LABEL; the substance is that every tradition interprets others." },
      { topic:"Coherence", scholars:["D'Costa","Rahner's defenders"], argument:"Logically: either Christ is the unique saviour (then non-Christians need him); or he isn't (then Christianity is just one option). Inclusivism preserves the first without damning the unreached.", counter:"Pluralism (Hick) avoids damning anyone.", response:"But at cost of reducing Christ to one option — not Christian." },
      { topic:"Modern reception", scholars:["Vatican II","post-conciliar Catholic teaching","ecumenical theology"], argument:"Vatican II's Nostra Aetate echoes Rahner: the Church 'rejects nothing that is true and holy in these religions'. Mainstream Catholic teaching.", counter:"This is still Catholic interpretation.", response:"All theology is interpretation; Rahner is honest about the interpretive standpoint." }
    ],
    conclusion:"Rahner's anonymous Christians is awkward as label but coherent as theology. The substance — that Christ's salvation can reach those who don't name him — is the only defensible Christian position on other religions." },

  { id:"dialogue-mission", paper:"03", topic:"Religious Pluralism (Society)",
    question:"'Inter-faith dialogue is incompatible with Christian mission.' Discuss. [40]",
    thesis:"Dialogue and mission can be compatible if mission is understood as witness rather than coercion. Newbigin's 'gospel in a pluralist society' shows how. Old colonial-style mission is incompatible with dialogue; modern witness-style mission is not.",
    paragraphs:[
      { topic:"The apparent tension", scholars:["traditional missiology","evangelical critique of dialogue"], argument:"Mission aims at conversion; dialogue treats other faiths as equals. The two seem to pull in opposite directions.", counter:"Only if mission is coercive and dialogue is relativist.", response:"Modern mission and dialogue avoid both extremes." },
      { topic:"Newbigin's synthesis", scholars:["Lesslie Newbigin (Gospel in a Pluralist Society)"], argument:"Confessional witness within pluralist context. Christians share the gospel as the truth they hold, while respecting others' freedom and engaging genuinely with their claims.", counter:"This still assumes Christianity's truth.", response:"All traditions assume their own truth in conversation. Newbigin is honest about this." },
      { topic:"Scriptural Reasoning", scholars:["David Ford","Peter Ochs","SR practice"], argument:"Jews, Christians, Muslims study each other's scriptures without converting. Deepens commitment to one's own tradition by sharpening understanding through engagement.", counter:"This isn't really mission.", response:"It's a form of witness — Christians sharing how their tradition reads scripture. Mission as witness, not conversion." }
    ],
    conclusion:"Dialogue and mission are compatible if mission is witness rather than coercion. Newbigin's synthesis shows the way; Scriptural Reasoning embodies it. Old colonial mission is incompatible; modern witness mission is not." },

  { id:"motherhood-vocation", paper:"03", topic:"Gender and Society",
    question:"'Christian teaching on motherhood is liberating, not restrictive.' Discuss. [40]",
    thesis:"Christian teaching on motherhood is both liberating and restrictive depending on context. As affirmation of motherhood's worth in a culture that devalues it, liberating; as restriction of women's other vocations, restrictive. Mature Christian teaching distinguishes.",
    paragraphs:[
      { topic:"The liberating reading", scholars:["John Paul II (Mulieris Dignitatem)","Tina Beattie","feminist Catholic theology"], argument:"Modern culture often devalues motherhood (career as 'real' work; mothering as 'just' domestic). Christian teaching affirms motherhood's deep worth, which can be feminist.", counter:"This still risks confining women.", response:"Affirming motherhood doesn't require restricting women to it; the affirmation can be liberating without being prescriptive." },
      { topic:"The restrictive reading", scholars:["feminist critics","Daphne Hampson"], argument:"Christian teaching has historically restricted women's other vocations (priesthood, leadership). Affirming motherhood while denying ordination instrumentalises women.", counter:"Mainline Protestant churches now ordain women.", response:"True — Christian teaching is plural. Catholic teaching distinctively maintains the restriction." },
      { topic:"The contemporary debate", scholars:["Sarah Coakley","Margaret Farley","contemporary Catholic theology"], argument:"Sarah Coakley recovers contemplative theology with feminist insight. Farley argues for just love framework. Christianity is developing.", counter:"Catholic teaching remains formally restrictive.", response:"Yes, but the development continues. The 'liberating not restrictive' claim is true for mainline Protestants, contested for Catholics." }
    ],
    conclusion:"Christian teaching on motherhood is liberating in cultures that devalue motherhood and restrictive when it confines women to motherhood alone. Mature teaching affirms motherhood AND women's other vocations." },

  { id:"daly-feminism", paper:"03", topic:"Gender and Theology",
    question:"'Daly's rejection of Christianity is more honest than Ruether's reform.' Discuss. [40]",
    thesis:"Daly's rejection is intellectually clearer but practically incoherent; Ruether's reform is messier but borne out by actual transformation. Honesty isn't the same as truth; Ruether's reformist position is more honest TO the actual development of Christianity.",
    paragraphs:[
      { topic:"Daly's position", scholars:["Mary Daly (Beyond God the Father, Gyn/Ecology)"], argument:"'If God is male, then the male is God'. Christianity is structurally patriarchal; reform impossible. Exit to goddess spirituality, gyn/ecology.", counter:"Other religions are also patriarchal; her exit is to a constructed alternative.", response:"Daly accepts this; constructed spirituality is an honest choice." },
      { topic:"Ruether's reform", scholars:["Rosemary Radford Ruether (Sexism and God-Talk)","Elizabeth Johnson"], argument:"Christianity contains prophetic resources against its own deformations. Reform from within is possible; women's ordination, inclusive liturgy, Wisdom tradition all draw on biblical sources.", counter:"Reform has been slow and contested.", response:"True, but the trajectory is clear — women's ordination is widespread; Wisdom tradition is mainstream theology." },
      { topic:"The verdict", scholars:["modern feminist theology","historical evidence"], argument:"Over 50 years, Ruether's reform position has been borne out: mainline Protestants ordain women; Catholic theology develops; feminist theology is mainstream. Daly's exit has fewer adherents.", counter:"Catholic Church still doesn't ordain women.", response:"True — but the deeper claim (Christianity essentially patriarchal) is contradicted by the changes that HAVE happened." }
    ],
    conclusion:"Daly's rejection is intellectually clearer; Ruether's reform is borne out by actual transformation. Honesty about the past favours Daly; honesty about the present favours Ruether." },

  { id:"dawkins-critique", paper:"03", topic:"Secularism",
    question:"'Dawkins has refuted Christianity.' Discuss. [40]",
    thesis:"Dawkins has not refuted Christianity. His arguments target a creationist caricature; serious Christian theology survives his critique unscathed. Terry Eagleton's 'Tintin in the Congo' analogy is accurate.",
    paragraphs:[
      { topic:"Dawkins' case", scholars:["Richard Dawkins (The God Delusion)"], argument:"Religion as evolutionary by-product; creationism vs. evolution; God hypothesis as poor explanation; religion causes violence and child abuse.", counter:"Religion isn't reducible to creationism.", response:"Dawkins treats it as if it is; his target is fundamentalist religion, not religion as such." },
      { topic:"What Dawkins misses", scholars:["Eagleton (Reason, Faith, Revolution)","McGrath (Dawkins' God)","Hart (Atheist Delusions)"], argument:"Serious theology (Aquinas, Tillich, Rahner) isn't addressed. God isn't a 'hypothesis' in scientific sense — God is ground of being. Eagleton: 'Tintin in the Congo' as biology critique.", counter:"Most religious people aren't Aquinas-level theologians.", response:"True — but to refute Christianity you'd refute its strongest version, not its weakest." },
      { topic:"What survives Dawkins", scholars:["modern Christian philosophy","Plantinga","Swinburne","McGrath"], argument:"Sophisticated theism (Plantinga's reformed epistemology, Swinburne's cumulative case) is unaffected by Dawkins' arguments. The God Delusion is popular polemic, not philosophical refutation.", counter:"Even so, Dawkins shifts the cultural conversation.", response:"Yes — but cultural shift isn't refutation. The conversation continues." }
    ],
    conclusion:"Dawkins has not refuted Christianity. His arguments target fundamentalist caricatures and miss serious theology. Christianity has survived far worse philosophical critiques than The God Delusion." },

  { id:"liberation-violence", paper:"03", topic:"Liberation Theology and Marx",
    question:"'Liberation theology justifies revolutionary violence.' Discuss. [40]",
    thesis:"Liberation theology mostly rejects revolutionary violence (Gutiérrez, Romero, mainstream liberation theology), but a minority strand (Torres) did endorse it. The mainstream position holds violence as last resort, not preferred option.",
    paragraphs:[
      { topic:"The charge", scholars:["Camilo Torres (Colombian priest who joined ELN)","conservative critics"], argument:"Torres joined armed guerrillas; killed in combat 1966. Liberation theology supplies justification for revolutionary violence against oppressive regimes.", counter:"Torres is exceptional, not representative.", response:"True — most liberation theologians explicitly reject violence." },
      { topic:"The mainstream position", scholars:["Gutiérrez","Romero","Sobrino"], argument:"Gutiérrez emphasises non-violent solidarity. Romero specifically opposed armed struggle. Sobrino: Christian witness against violence even when violently opposed.", counter:"They still use class-conflict analysis.", response:"Analytical framework (Marx) ≠ political endorsement (revolutionary violence). Liberation theology takes the analysis without the politics." },
      { topic:"Aquinas' just war framework", scholars:["Aquinas","Catholic social teaching","just war theory"], argument:"Catholic teaching has always permitted violence as last resort against tyranny (Aquinas). Liberation theology applies traditional teaching to modern oppression.", counter:"This still risks endorsing revolution.", response:"Just war is restrictive; liberation theology mostly applies it restrictively." }
    ],
    conclusion:"Liberation theology does not justify revolutionary violence as policy. The mainstream position (Gutiérrez, Romero) rejects it; Torres is exceptional. The Catholic tradition permits violence only as last resort." },

  /* Final batch — popular variations and high-frequency questions */

  { id:"hume-design", paper:"01", topic:"Arguments from Observation",
    question:"'Hume's critique of the teleological argument is decisive.' Discuss. [40]",
    thesis:"Hume's critique is decisive against Paley's biological version but not against fine-tuning. His objections — weak analogy, no experience of universe-creation, problem of evil — survive Darwin but are partially answered by modern fine-tuning arguments.",
    paragraphs:[
      { topic:"Hume's objections", scholars:["Hume (Dialogues Concerning Natural Religion)"], argument:"Universe-machine analogy weak; vegetable analogy better. No experience of universe-creation. Even granted designer, why one, benevolent, perfect?", counter:"These weaken not refute.", response:"Strong enough to reduce from proof to inference." },
      { topic:"Darwin reinforces Hume", scholars:["Darwin","Dawkins"], argument:"Natural selection produces apparent design — Paley's biological argument dies.", counter:"Behe's irreducible complexity.", response:"Rejected by mainstream biology." },
      { topic:"Fine-tuning survives", scholars:["Swinburne","Collins"], argument:"Cosmological constants pre-date evolution; fine-tuning answers Hume's biology-specific objections.", counter:"Multiverse alternative.", response:"Multiverse is unobservable; design and multiverse are competing inferences, neither decisive." }
    ],
    conclusion:"Hume's critique is decisive against Paley but not against fine-tuning. The argument retreats but doesn't die." },

  { id:"kalam", paper:"01", topic:"Arguments from Observation",
    question:"'The Kalam cosmological argument is more convincing than Aquinas'.' Discuss. [40]",
    thesis:"The Kalam argument (William Lane Craig) has scientific appeal (Big Bang as cosmic beginning) but inherits classical cosmological problems. Aquinas' contingency argument is more philosophically robust.",
    paragraphs:[
      { topic:"Kalam argument", scholars:["William Lane Craig","al-Ghazali"], argument:"Everything that begins has cause; universe began (Big Bang); therefore universe has cause. Cause must be timeless, personal.", counter:"Why personal?", response:"Craig: only personal cause can spontaneously initiate change." },
      { topic:"Scientific support", scholars:["Hawking-Penrose theorems","modern cosmology"], argument:"Big Bang strongly suggests cosmic beginning. Singularity theorems make eternal universe difficult.", counter:"Modern cosmology allows multiverse, eternal inflation.", response:"These are theoretical extensions; observational evidence supports beginning." },
      { topic:"Aquinas' contingency argument", scholars:["Aquinas (3rd Way)"], argument:"Doesn't depend on temporal beginning — even eternal universe needs explanation. Argues from contingency, not initiation.", counter:"Russell: brute fact.", response:"Same response works against Kalam — temporal beginning could also be brute fact." }
    ],
    conclusion:"Kalam has scientific accessibility; Aquinas has philosophical robustness. Neither is decisive; Aquinas' contingency argument may be more durable across cosmological changes." },

  { id:"swinburne-experience", paper:"01", topic:"Religious Experience",
    question:"'Swinburne's principle of credulity is the best defence of religious experience.' Discuss. [40]",
    thesis:"Swinburne's principle is the best PHILOSOPHICAL defence — it gives experience prima facie weight while permitting defeaters. But it cannot resist cross-cultural variation as defeater; Hick's pluralist response is then required.",
    paragraphs:[
      { topic:"Swinburne's principles", scholars:["Swinburne (Existence of God)"], argument:"Credulity: if it seems X is present, probably X is present. Testimony: believe what others say they experienced. Both defeasible.", counter:"Subjective conviction is poor evidence for objective claims.", response:"Swinburne: we apply credulity generally; rejecting it for religion is special pleading." },
      { topic:"Cross-cultural problem", scholars:["Steven Katz","Hick"], argument:"Experiences track culture (Catholics see Mary, Hindus don't). Suggests cultural construction, not external referent.", counter:"Hick: all encounter same Real through different cultural schemas.", response:"Saves evidence at cost of specific religious truth-claims." },
      { topic:"Naturalistic mechanisms", scholars:["Persinger","Freud"], argument:"Temporal-lobe stimulation, wish-fulfilment can produce phenomenologically identical experiences.", counter:"Mechanism doesn't settle veridicality.", response:"But it raises probability of error; credulity should be tempered by this." }
    ],
    conclusion:"Swinburne's principles are the best philosophical defence, but they cannot establish the specific truth of any religion. They give the believer a foothold; they don't convert the sceptic." },

  { id:"plantinga-evil", paper:"01", topic:"Problem of Evil",
    question:"'Plantinga's free-will defence solves the problem of evil.' Discuss. [40]",
    thesis:"Plantinga solves the LOGICAL problem of evil but not the evidential. The free-will defence shows omni-God and evil are logically compatible; it doesn't show the quantity and distribution of evil is consistent with God's goodness.",
    paragraphs:[
      { topic:"Free-will defence", scholars:["Plantinga (God, Freedom, and Evil)"], argument:"God could not create free creatures and guarantee they always choose good — counterfactuals of freedom limit even omnipotence. Logical compatibility of God and evil established.", counter:"Doesn't explain natural evil.", response:"Plantinga: natural evil could come from fallen angels (defensible logically even if implausible)." },
      { topic:"Evidential problem unaddressed", scholars:["Rowe (fawn)","Wykstra","Adams"], argument:"Even logical compatibility doesn't make existence of God probable given the quantity of evil. Rowe's fawn: no human will benefit; no moral lesson.", counter:"Wykstra: we may not see all the goods.", response:"Sceptical theism saves theodicy but at huge cost (paralyses moral judgement)." },
      { topic:"What Plantinga achieves", scholars:["Plantinga","critics of Mackie"], argument:"Definitively answers Mackie. Logical problem dead. Sufficient to keep theism rational against deductive arguments.", counter:"Evidential problem remains.", response:"Right — different problem. Plantinga doesn't claim to solve it; he solves the logical one." }
    ],
    conclusion:"Plantinga solves the logical problem of evil definitively; the evidential problem is untouched. He keeps theism rational against deductive arguments but doesn't make evil unproblematic." },

  { id:"omnipotence-paradox", paper:"01", topic:"Nature of God",
    question:"'The stone paradox shows omnipotence is incoherent.' Discuss. [40]",
    thesis:"The stone paradox is dissolved, not solved, by Aquinas' move that omnipotence covers what is logically possible. Asking whether God can do the logically impossible is asking whether God can do non-things — a verbal trick, not a real problem.",
    paragraphs:[
      { topic:"The paradox", scholars:["traditional formulation"], argument:"Can God create a stone too heavy for him to lift? If yes, something he can't do; if no, something he can't do. Either way, not omnipotent.", counter:"This treats omnipotence as ability to do anything sayable.", response:"Aquinas: omnipotence is ability to do anything logically possible." },
      { topic:"Aquinas' resolution", scholars:["Aquinas (Summa I.25)"], argument:"'Square circle' is just words, not a thing. 'Stone too heavy for omnipotent being to lift' is similar incoherent description, not a real task.", counter:"This restricts omnipotence.", response:"It clarifies what omnipotence means; doesn't reduce divine power." },
      { topic:"Descartes' alternative", scholars:["Descartes","modern voluntarism"], argument:"Descartes: God could have made 2+2=5. Truly unlimited omnipotence.", counter:"This makes God irrational.", response:"And makes theology impossible; Aquinas' position is better." }
    ],
    conclusion:"The stone paradox shows omnipotence-as-anything-sayable is incoherent. Aquinas' omnipotence-as-logical-possibility is coherent; the paradox dissolves." },

  { id:"tillich-symbol-content", paper:"01", topic:"Religious Language (Negative/Analogical/Symbolic)",
    question:"'Tillich's symbolic theology empties religious language of meaning.' Discuss. [40]",
    thesis:"Tillich's symbolism does risk emptying cognitive content but his account remains defensible if 'symbol' is understood as participatory rather than merely expressive. Aquinas' analogy preserves more, but Tillich captures liturgical and devotional dimensions Aquinas misses.",
    paragraphs:[
      { topic:"Tillich's account", scholars:["Tillich (Dynamics of Faith)"], argument:"Symbols participate in what they symbolise; not merely conventional signs. 'God exists' is symbolic — God is 'ground of being', not 'a being'.", counter:"If symbolic, what is being claimed?", response:"Ultimate concern, the depth dimension of being." },
      { topic:"The cognitive problem", scholars:["Davies","analytic philosophers of religion"], argument:"If 'God exists' is purely symbolic, we can't evaluate it. Religious claims need cognitive content to function as claims.", counter:"Tillich preserves this through symbolic function.", response:"But 'symbolic truth' is unclear — what does it commit us to?" },
      { topic:"What Tillich captures", scholars:["Tillich","liturgical theology"], argument:"Religious language is more than literal predication — it shapes worship, devotion, identity. Tillich captures these performative-participatory dimensions.", counter:"This complements rather than replaces literal/analogical predication.", response:"True — best read alongside Aquinas, not against him." }
    ],
    conclusion:"Tillich's symbolism alone risks emptying content but captures dimensions Aquinas misses. The mature view uses both — symbol AND analogy, performance AND predication." },

  { id:"ayer-verification", paper:"01", topic:"Religious Language (20th Century)",
    question:"'Ayer's verification principle has fatal flaws.' Discuss. [40]",
    thesis:"Ayer's strong verification principle is fatally self-refuting; weak verification still excludes too much; falsification is too narrow. Yet the underlying insight — religious language must connect to experience somehow — has not been refuted.",
    paragraphs:[
      { topic:"The principle", scholars:["Ayer (Language, Truth and Logic)"], argument:"Statement is meaningful iff analytically true or empirically verifiable. Religious statements neither, hence meaningless.", counter:"The principle itself fails its own test.", response:"Ayer eventually accepted this." },
      { topic:"Weakening attempts", scholars:["Ayer (weak verification)","Flew (falsification)"], argument:"Weak version: some observations count for/against. Falsification: meaning requires falsifiability.", counter:"Weak version lets too much in; falsification lets too little.", response:"Hare and Mitchell respond that meaningful belief doesn't require strict falsifiability." },
      { topic:"What survives", scholars:["modern empiricism","Swinburne"], argument:"Insight: meaningful claims should connect to experience. Swinburne accepts this and argues religious experience does the connecting.", counter:"This is a different position from Ayer's.", response:"Right — Ayer's specific principle is dead; the connective insight survives in modified form." }
    ],
    conclusion:"Ayer's verification principle is fatally flawed. Strong version self-refutes; weak version is too lenient; falsification is too strict. The underlying empiricist intuition survives but Ayer's specific implementation does not." },

  { id:"aquinas-natural-vs-secular", paper:"02", topic:"Natural Law",
    question:"'Natural law has no place in secular ethics.' Discuss. [40]",
    thesis:"Natural law has no place in secular ethics in its traditional form (requiring theological premises about telos) but its underlying intuitions (basic goods, structures of human flourishing) survive in secular natural law-style theories like Nussbaum's capabilities approach.",
    paragraphs:[
      { topic:"Traditional version requires theology", scholars:["Aquinas","Catholic moral theology"], argument:"Natural law as Aquinas formulated requires telos, divine ordinance, integration with eternal law. Secular ethics doesn't share these premises.", counter:"Finnis claims to remove the theological premises.", response:"Finnis' resulting position is rationalist intuitionism, not really natural law." },
      { topic:"Secular descendants", scholars:["Nussbaum (capabilities)","Sen","Foot (Natural Goodness)"], argument:"Modern theories of human flourishing without theological grounding: capabilities, virtue ethics. Foot: 'natural goodness' as biological function need not be theological.", counter:"These differ from Aquinas substantially.", response:"They preserve the structural intuition (objective human flourishing) without theological commitments." },
      { topic:"What's preserved", scholars:["modern moral philosophers"], argument:"Natural law's deepest claim: humans have a nature whose flourishing constitutes moral good. This can be argued naturalistically.", counter:"Hume's is/ought gap still bites.", response:"Foot, Nussbaum address this within a virtue ethics framework." }
    ],
    conclusion:"Traditional natural law has no place in secular ethics; its core intuitions (objective flourishing) survive in modern theories. Aquinas' framework is theological; Nussbaum's heir-theory is secular." },

  { id:"agape-rules", paper:"02", topic:"Situation Ethics",
    question:"'Situation ethics needs rules to function.' Discuss. [40]",
    thesis:"Fletcher's situation ethics needs supplementary rules to function in practice, despite his official rejection of them. His own examples implicitly rely on near-rules; pure situationism collapses into subjectivism.",
    paragraphs:[
      { topic:"Fletcher's official position", scholars:["Fletcher","Robinson"], argument:"Only love is absolute. Rules are 'guides' or 'illuminators' but never bind. Particular judgement of what love requires.", counter:"Fletcher's examples (the East German prison case, Mrs Bergmeier) implicitly invoke rules about proportionality, foreseeable consequences.", response:"True — his examples are not pure situationist; they're rule-informed." },
      { topic:"Why rules are needed", scholars:["Barclay","Hare","virtue ethics"], argument:"Without rules, similar cases get treated inconsistently. Hare: meaningful moral judgement requires universalisability — which is rule-like.", counter:"Particularism (Dancy) argues against universalisability.", response:"But particularism has its own version of consistency; pure situationism without any consistency is just subjectivism." },
      { topic:"Modified situationism", scholars:["modern virtue ethics","Catholic moral theology"], argument:"Discernment within rules works: rules give general guidance, virtues give wisdom for particular application. This isn't Fletcher's pure agape but it's better.", counter:"This isn't really situation ethics anymore.", response:"Right — pure situation ethics doesn't really exist in viable form." }
    ],
    conclusion:"Situation ethics needs rules. Fletcher's official rejection of them is undermined by his own examples; pure situationism collapses into subjectivism. The viable position is rules-and-virtues with agape as ordering principle." },

  { id:"kant-deontology-superior", paper:"02", topic:"Kantian Ethics",
    question:"'Kantian deontology is superior to consequentialism.' Discuss. [40]",
    thesis:"Kantian deontology is superior for rights and dignity; consequentialism is superior for policy. Neither is wholly superior; they address different aspects of moral life. Mature ethics integrates both — rights as side-constraints, utility within them.",
    paragraphs:[
      { topic:"Kantian advantages", scholars:["Kant","O'Neill","modern human rights theory"], argument:"Treats persons as ends, not means. Grounds rights absolutely. Resistant to utilitarian justifications of injustice (sheriff, organ harvest).", counter:"Lying-to-the-murderer problem.", response:"Modern Kantians refine this; pluralist deontology (Ross) handles conflicts." },
      { topic:"Consequentialist advantages", scholars:["Bentham","Mill","public policy traditions"], argument:"Foundation of policy, triage, cost-benefit. Takes consequences seriously where Kant doesn't. Impartial.", counter:"Justice problem.", response:"Real — but doesn't destroy consequentialism's usefulness within rights framework." },
      { topic:"Integration", scholars:["Rawls","Nozick","mixed theories"], argument:"Rawls: deontological framework + maximin within it. Nozick: rights as side-constraints + Pareto-improvement within them. Best of both.", counter:"This isn't pure Kant.", response:"Pure Kant has the lying problem; integrated theories are more defensible." }
    ],
    conclusion:"Kantian deontology is superior for rights; consequentialism is superior for policy. Neither alone is sufficient; mature ethics integrates them as rights-constrained utility." },

  { id:"mill-harm", paper:"02", topic:"Utilitarianism",
    question:"'Mill's harm principle is the foundation of liberal ethics.' Discuss. [40]",
    thesis:"Mill's harm principle is foundational for liberal LEGAL ethics (what may be coerced) but not for moral ethics (what may be done). The harm principle limits state action; it doesn't limit moral judgement.",
    paragraphs:[
      { topic:"The harm principle", scholars:["Mill (On Liberty)"], argument:"The only justification for limiting individual liberty is preventing harm to others. Foundation of liberal society.", counter:"What counts as harm?", response:"Mill: actual injury to others, not offence or self-harm." },
      { topic:"Foundation of liberal law", scholars:["Hart (Law, Liberty, Morality)","Devlin (counter-position)"], argument:"Modern liberal democracies broadly follow Mill: legalise homosexuality, drugs, gambling between consenting adults. Devlin's moralism is the alternative.", counter:"Self-harm laws (drug prohibition, seatbelts) violate Mill.", response:"True — pure Millian liberty is rare; modified versions dominate." },
      { topic:"Limits as moral theory", scholars:["communitarian critics","virtue ethics"], argument:"Mill's principle is about coercion, not morality. It doesn't tell us what is good or virtuous, just what may be legally enforced.", counter:"Mill thought it had broader application.", response:"Even granting Mill, modern liberalism uses the principle narrowly for legal/political purposes." }
    ],
    conclusion:"Mill's harm principle is foundational for liberal LAW but not for liberal ETHICS. It limits coercion; it doesn't limit moral judgement. Within its proper scope, it is foundational." },

  { id:"care-ethics", paper:"02", topic:"Meta-ethics",
    question:"'Feminist ethics of care offers a better alternative to traditional ethics.' Discuss. [40]",
    thesis:"Care ethics offers an important corrective to traditional ethics (Kant, utilitarianism) but is not better as a stand-alone theory. The mature view integrates care with justice; pure care ethics neglects strangers and structural justice.",
    paragraphs:[
      { topic:"Care ethics' contribution", scholars:["Carol Gilligan","Nel Noddings","feminist philosophy"], argument:"Traditional ethics universalises abstractly. Care ethics emphasises relationships, responsibility, attentive listening. Different moral voice — Gilligan's response to Kohlberg.", counter:"This is psychology, not ethics.", response:"It's both — moral psychology informs ethics." },
      { topic:"Limits", scholars:["Held","O'Neill","critics"], argument:"Care for those near risks neglecting distant strangers. Care can sustain patriarchy if women are 'naturally' carers. Care without justice is incomplete.", counter:"Modern care ethics integrates justice.", response:"Then it converges with traditional ethics with feminist insights." },
      { topic:"The mature view", scholars:["Joan Tronto","modern feminist ethics"], argument:"Care + justice + virtue + universal principles together. Care ethics adds dimensions Kant and Mill miss; doesn't replace them.", counter:"This dilutes 'feminist' ethics.", response:"It strengthens it by integrating, not isolating." }
    ],
    conclusion:"Care ethics offers important corrections to traditional ethics but is not better as a stand-alone theory. The mature view integrates care with justice and universal principles." },

  { id:"newman-conscience-voice", paper:"02", topic:"Conscience",
    question:"Critically assess Newman's view of conscience as 'the voice of God'. [40]",
    thesis:"Newman's view captures the religious phenomenology of conscience but cannot withstand modern philosophical scrutiny. As metaphor, it survives; as literal claim about divine voice, it is implausible given the variability and fallibility of conscience.",
    paragraphs:[
      { topic:"Newman's position", scholars:["Newman ('A Letter to the Duke of Norfolk')"], argument:"Conscience is 'the aboriginal Vicar of Christ' — the voice of God's law in the soul. Even atheists possess it as God-given.", counter:"If God's voice, why does it err?", response:"Newman: conscience can be miseducated; doesn't undermine its divine origin." },
      { topic:"Modern critique", scholars:["Freud","Haidt","modern moral psychology"], argument:"Conscience varies wildly across cultures and individuals. Freud: super-ego. Haidt: moral intuition with evolutionary roots. No need for divine voice.", counter:"Modern accounts identify mechanisms but don't refute divine source.", response:"They don't refute but they undercut the 'voice of God' as a literal description." },
      { topic:"Survival as metaphor", scholars:["Aquinas","modern Christian ethics"], argument:"Conscience as metaphor for divine voice — capturing the categorical, authoritative phenomenology of moral experience — survives.", counter:"Then it's not really 'voice of God'.", response:"It's 'voice of God' through the mediation of human reason and emotion. Aquinas already said this." }
    ],
    conclusion:"Newman's 'voice of God' survives as metaphor capturing conscience's phenomenology but fails as literal claim. Aquinas' more nuanced account (reason given by God) is more defensible." },

  { id:"sexual-modern", paper:"02", topic:"Sexual Ethics",
    question:"'Modern sexual ethics has rejected all religious insight.' Discuss. [40]",
    thesis:"Modern sexual ethics has rejected specific religious prohibitions but absorbed many religious insights. Consent ethics owes more to Christian personalism than its practitioners often acknowledge; the rejection is partial.",
    paragraphs:[
      { topic:"What has been rejected", scholars:["secular ethics","modern liberal society"], argument:"Religious prohibitions on premarital sex, contraception, divorce, same-sex relationships have been rejected in mainstream Western society.", counter:"Religious arguments still influence policy debates.", response:"Influence yes, dominance no. Modern sexual ethics is largely secular." },
      { topic:"What has been absorbed", scholars:["personalism","Catholic 'theology of the body' influence on consent ethics"], argument:"Consent ethics emphasises persons as ends, not means. This is Kantian-Christian personalism. The idea that sex matters morally (vs. casual physical act) is Christian inheritance.", counter:"These could be secular.", response:"Could be — but historically they aren't; Western consent ethics has Christian DNA." },
      { topic:"What remains contested", scholars:["religious vs. secular debate","Margaret Farley"], argument:"Marriage definition, sexual abstinence, pornography ethics remain contested. Religious voices contribute substantively even when not dominant.", counter:"They're losing ground.", response:"In specific debates yes; but they remain interlocutors." }
    ],
    conclusion:"Modern sexual ethics has rejected specific religious prohibitions but absorbed religious insights about consent, personhood, and moral weight of sex. Wholesale rejection is the misreading." },

  { id:"resurrection-defence", paper:"03", topic:"Death and Afterlife",
    question:"'Resurrection of the body is more credible than immortality of the soul.' Discuss. [40]",
    thesis:"Resurrection of the body is more biblically grounded and philosophically credible than Platonic immortality of soul. N.T. Wright shows resurrection (not Platonic immortality) is the New Testament's view; modern Christian theology has recovered this.",
    paragraphs:[
      { topic:"Platonic immortality", scholars:["Plato (Phaedo)","Augustine (some passages)"], argument:"Soul as separable immortal substance; survives death without body. Influenced Christian thought through Augustine and beyond.", counter:"This isn't biblical.", response:"It became Christianised through Plato but isn't original to scripture." },
      { topic:"Biblical resurrection", scholars:["N.T. Wright (Surprised by Hope)","Paul (1 Corinthians 15)"], argument:"NT's hope is bodily resurrection, not soul-survival. 'It is sown a natural body; it is raised a spiritual body'. Distinct from Platonic immortality.", counter:"This still leaves the question of what survives between death and resurrection.", response:"Various Christian accounts (soul sleep, intermediate state); the key point is bodily resurrection as final hope." },
      { topic:"Philosophical credibility", scholars:["Aristotle (form-matter unity)","modern Christian theology"], argument:"Aristotelian hylomorphism: person is form-matter unity. Resurrection preserves person better than Platonic dualism (which struggles with personal identity).", counter:"Resurrection requires miraculous re-instantiation.", response:"Yes — but theology already supposes miraculous; this isn't a new problem." }
    ],
    conclusion:"Resurrection of the body is more biblically grounded and philosophically credible than Platonic immortality of soul. Modern Christian theology has rightly recovered this." },

  { id:"jesus-divinity-historical", paper:"03", topic:"Person of Jesus Christ",
    question:"'Historical Jesus didn't claim divinity.' Discuss. [40]",
    thesis:"The historical Jesus probably didn't make explicit divinity claims in the way the Gospels record, but he made implicit claims (forgiveness of sins, Lord of the Sabbath, 'son of man') that the early church developed into explicit Christology. The dichotomy 'historical Jesus vs Christ of faith' is overdrawn.",
    paragraphs:[
      { topic:"Historical scholarship", scholars:["E.P. Sanders","Geza Vermes","Bart Ehrman"], argument:"Critical scholars argue Jesus saw himself as eschatological prophet of God's kingdom, not as divine in metaphysical sense. Divinity-claims in John may be later theology.", counter:"This dates John too late; many scholars see continuity.", response:"Scholarship is contested; my claim is what's likely, not certain." },
      { topic:"Implicit divinity claims", scholars:["N.T. Wright","Larry Hurtado (Lord Jesus Christ)"], argument:"Jesus claimed to forgive sins (God's prerogative), Lord of Sabbath, authority over Torah. These are implicit divinity claims even if not explicit metaphysical ones.", counter:"Implicit isn't explicit.", response:"True, but the early Church's high Christology develops from these implicit claims; not arbitrary." },
      { topic:"Continuity Jesus-Church", scholars:["Hurtado","Wright"], argument:"From earliest period (within 20 years of crucifixion), Christians worshipped Jesus alongside God. This requires explanation; implicit claims plus resurrection experience is the most plausible.", counter:"Could be early church innovation.", response:"But the innovation is so early it requires substantial prompt from Jesus himself." }
    ],
    conclusion:"Historical Jesus probably didn't make explicit metaphysical divinity claims but did make implicit ones (forgiveness, authority) that the early church developed. The 'historical Jesus vs. Christ of faith' dichotomy is overdrawn." },

  { id:"barth-natural-theology", paper:"03", topic:"Knowledge of God",
    question:"'Barth was right to reject natural theology.' Discuss. [40]",
    thesis:"Barth was right that natural theology can be misused (the German Christians' völkisch theology) but wrong to reject it absolutely. Brunner's modest natural theology is defensible; Aquinas' integration remains the most coherent position.",
    paragraphs:[
      { topic:"Barth's case", scholars:["Karl Barth (Nein!)","Barmen Declaration"], argument:"Natural theology gives independent ground for knowing God apart from Christ; this opens the door to political theology (race, nation as revelation). Barmen rejected this absolutely.", counter:"Barth was overcorrecting against Nazi context.", response:"Even so, the overcorrection has lasting damage to Protestant theology." },
      { topic:"Brunner's modest version", scholars:["Emil Brunner (Nature and Grace)"], argument:"Modest natural theology — point of contact (Anknüpfungspunkt) in human nature for revelation. Doesn't ground knowledge of God independently but enables receiving revelation.", counter:"Barth: even this gives natural revelation too much.", response:"Brunner's position is more nuanced and defensible than Barth gave credit for." },
      { topic:"Aquinas' integration", scholars:["Aquinas","Catholic teaching","Romans 1"], argument:"Natural theology reaches transcendent first cause; revelation specifies which God. Both are needed; neither alone is sufficient. Romans 1:20: God's attributes 'clearly seen' from creation.", counter:"Aquinas' confidence in natural reason may be excessive.", response:"Modified versions (Plantinga, Swinburne) preserve the structure with more epistemic humility." }
    ],
    conclusion:"Barth was right about the abuse of natural theology, wrong to reject it absolutely. Brunner's modest natural theology and Aquinas' integration are more defensible. Total rejection is overcorrection." },

  { id:"agape-only", paper:"03", topic:"Christian Moral Principles",
    question:"'Agape is sufficient for Christian moral guidance.' Discuss. [40]",
    thesis:"Agape is necessary but not sufficient. Without supplementary rules (Decalogue, NT commands), virtues (humility, justice, courage), and ecclesial discernment, 'love' is too thin to generate determinate Christian ethics.",
    paragraphs:[
      { topic:"Fletcher's case for sufficiency", scholars:["Fletcher","Robinson"], argument:"Jesus' summary: love God and neighbour. Paul: love is fulfilling of law. Augustine: 'love and do what you will'. Agape generates ethics.", counter:"These statements are summary, not exhaustive.", response:"Right — and Fletcher's interpretation overreaches." },
      { topic:"Why agape needs supplementation", scholars:["Aquinas","Barclay","Hauerwas"], argument:"How does love work in particular cases? Without rules, identical-seeming cases get treated inconsistently. Without virtues, love is sentimental. Without ecclesial context, love becomes individualistic.", counter:"Particular judgement handles cases.", response:"Particular judgement informed by rules and virtues — Aquinas' approach." },
      { topic:"Mature Christian ethics", scholars:["Aquinas","NT Wright","modern Christian ethics"], argument:"Agape as ordering principle + Decalogue and NT commands as floor + virtues as character + ecclesial discernment as community judgement. The whole working together.", counter:"This is more complex than Jesus' summary.", response:"Jesus' summary doesn't exclude the complexity; it orders it." }
    ],
    conclusion:"Agape is necessary but not sufficient for Christian moral guidance. It orders other principles without replacing them. Fletcher's pure agape ethics is too thin." },

  { id:"bonhoeffer-relevance", paper:"03", topic:"Bonhoeffer",
    question:"'Bonhoeffer is more relevant today than Bonhoeffer's own time.' Discuss. [40]",
    thesis:"Bonhoeffer remains relevant to multiple modern contexts (consumer Christianity, political authoritarianism, comfortable religion) but his specific witness — costly resistance to mortal tyranny — is hopefully not what most modern Christians need to imitate. Relevance is structural, not specific.",
    paragraphs:[
      { topic:"What was relevant in his time", scholars:["Bonhoeffer (Cost of Discipleship)","Confessing Church","historical context"], argument:"Nazism made costly resistance imperative. Bonhoeffer's specific witness — Finkenwalde, Confessing Church, plot — was urgent.", counter:"Specific context, specific witness.", response:"Right — but the underlying theology is more general." },
      { topic:"Modern relevance", scholars:["Hauerwas","modern Christian witness","political theology"], argument:"Costly grace indicts consumerist Christianity universally. Civil disobedience template informs civil rights, anti-apartheid, modern political resistance.", counter:"Modern application can misuse Bonhoeffer.", response:"Disciplined application requires discernment; not all modern resistance is Bonhoefferian." },
      { topic:"What remains unique", scholars:["Bonhoeffer's death","martyrology"], argument:"Bonhoeffer's specific witness — execution at Flossenbürg — gives his theology weight that paper-only theologians can't match. The cost was paid.", counter:"This makes him incomparable.", response:"Right — relevance is structural (his theology); specificity is unique (his death)." }
    ],
    conclusion:"Bonhoeffer remains relevant in his theology, distinct in his witness. Modern Christians need his theology of costly grace and civil disobedience; we don't (hopefully) need to replicate his specific historical context." },

  { id:"hick-pluralism-coherent", paper:"03", topic:"Religious Pluralism (Theology)",
    question:"'Hick's pluralism is incoherent.' Discuss. [40]",
    thesis:"Hick's pluralism faces serious coherence problems (Kantian noumena, equality of contradictory truth-claims) but isn't strictly incoherent. The deeper problem is theological: it reduces Christ to one option among many, which Christianity cannot accept.",
    paragraphs:[
      { topic:"Hick's account", scholars:["Hick (Interpretation of Religion)"], argument:"All major religions are responses to the same Real, filtered through cultural schemas. Kantian: noumenal Real, phenomenal expressions. Equal validity.", counter:"How can mutually contradictory religions be equally valid?", response:"Hick: contradictions are at the phenomenal level, not the noumenal." },
      { topic:"Coherence problems", scholars:["D'Costa","critics of Hick"], argument:"Kantian noumena are unknowable; how do we know all religions equally responsive to the Real? The framework itself is one cultural construction.", counter:"Hick: it's not a religion but a meta-theory.", response:"But it's still one tradition's account of others; it has its own cultural location." },
      { topic:"Theological problem", scholars:["traditional Christianity","D'Costa","inclusivist alternatives"], argument:"For Christianity, Christ is the Word of God incarnate, the definitive revelation. Pluralism reduces him to one cultural option; not really Christian.", counter:"Christians can hold pluralism privately.", response:"Then they're holding Hick's framework, not historic Christianity." }
    ],
    conclusion:"Hick's pluralism is not strictly incoherent but faces serious problems. The deeper issue is theological: it cannot preserve Christianity's specific claims about Christ. Inclusivism (Rahner) is preferable." },

  { id:"scriptural-reasoning", paper:"03", topic:"Religious Pluralism (Society)",
    question:"'Scriptural Reasoning is the best form of interfaith dialogue.' Discuss. [40]",
    thesis:"Scriptural Reasoning is the most theologically defensible form of dialogue for serious religious participants because it preserves each tradition's commitments while enabling genuine engagement. Other forms (theological dialogue, ethical cooperation) have their places.",
    paragraphs:[
      { topic:"The SR practice", scholars:["David Ford","Peter Ochs","SR practice"], argument:"Jews, Christians, Muslims study each other's scriptures without compromising commitments. Not syncretism; not relativism. Mutual reading deepens own tradition.", counter:"Doesn't this risk relativism?", response:"Practitioners report it deepens commitment to own tradition — confirmed empirically." },
      { topic:"Alternative forms", scholars:["theological dialogue","ethical cooperation"], argument:"Theological dialogue (formal comparison of doctrines), ethical cooperation (joint action on poverty, etc.), interfaith friendship (informal). All have value.", counter:"Why is SR best?", response:"It engages at the deepest level (scripture) without forcing premature theological agreement. Preserves difference while enabling encounter." },
      { topic:"Limits", scholars:["critics of SR","secular interfaith advocates"], argument:"SR is academic; doesn't reach ordinary believers. Requires theological literacy not all participants have.", counter:"Real, but SR can model what ordinary believers can aim at.", response:"It shapes religious leadership, which shapes congregations." }
    ],
    conclusion:"Scriptural Reasoning is the most theologically robust form of dialogue; other forms have their places. It preserves difference while enabling encounter — what serious interfaith engagement requires." },

  { id:"ruether-resurrection", paper:"03", topic:"Gender and Theology",
    question:"'Ruether's reform position has been borne out by history.' Discuss. [40]",
    thesis:"Ruether's reform position has been substantially borne out by mainline Protestant churches (women's ordination, inclusive language, feminist theology) but only partially in Catholic theology. The empirical evidence supports reform over Daly's exit.",
    paragraphs:[
      { topic:"What has happened", scholars:["mainline Protestant women's ordination","Vatican II reforms","feminist theology academic"], argument:"Anglicans, Methodists, Lutherans, Presbyterians ordain women. Catholic Church engages feminist theology academically. Inclusive language widespread. Feminist theology mainstream.", counter:"Catholic Church still doesn't ordain women.", response:"But Catholic engagement has changed substantially; the trajectory matters." },
      { topic:"What Daly predicted", scholars:["Mary Daly","Daphne Hampson"], argument:"Daly predicted Christianity unreformable. Hampson followed her into post-Christian feminism. Their movement is small and shrinking.", counter:"Their position is theologically clearer.", response:"Possibly — but empirically refuted by Ruether's success." },
      { topic:"What remains contested", scholars:["modern Catholic teaching","conservative evangelicals"], argument:"Catholic Church on ordination; some conservative evangelicals on complementarianism; trans issues across all traditions. Reform isn't complete.", counter:"Doesn't this support Daly?", response:"Incomplete reform isn't impossibility of reform. The trajectory is reformist." }
    ],
    conclusion:"Ruether's reform position has been substantially borne out by mainline Protestants and partially by Catholics. The empirical evidence over 50 years supports reform over exit. Daly's pessimism was empirically refuted." },

  { id:"taylor-secular", paper:"03", topic:"Secularism",
    question:"'Secularism is itself a religious tradition.' Discuss. [40]",
    thesis:"Charles Taylor is right that secularism is not neutral — it is a specific tradition with its own assumptions. But calling it 'religious' is too strong; secularism is a metaphysical/political stance, not a religion in the standard sense.",
    paragraphs:[
      { topic:"Taylor's argument", scholars:["Charles Taylor (A Secular Age)"], argument:"Secularism isn't absence of religion but a specific stance about religion (private, optional, naturalist worldview). The 'immanent frame' is a constructed perspective.", counter:"Doesn't make it religious.", response:"Doesn't, but does make it non-neutral — one tradition among others." },
      { topic:"Why not religion", scholars:["John Gray","analytic philosophers"], argument:"Standard religions involve worship, ritual, transcendence, salvation. Secularism lacks these.", counter:"Some secularisms (state atheism, scientism) have quasi-religious features.", response:"True but extreme cases; standard secularism lacks them." },
      { topic:"What is right in the claim", scholars:["Taylor","Hauerwas","political theology"], argument:"Secularism functions as a tradition: shapes culture, makes assumptions, excludes religious voices. Politically, it's not neutral.", counter:"Then 'religious tradition' is metaphorical.", response:"Right — better to say 'tradition' or 'stance' than 'religion'. The non-neutrality is real; the religion label is misleading." }
    ],
    conclusion:"Secularism is a tradition with its own assumptions, not a neutral default. Calling it 'religious' is too strong, but the non-neutrality is real. Modern political theology engages secularism as one tradition among others." },

  { id:"gutierrez-faith", paper:"03", topic:"Liberation Theology and Marx",
    question:"'Gutiérrez's liberation theology is Marxist rather than Christian.' Discuss. [40]",
    thesis:"Gutiérrez's liberation theology draws on Marxist social analysis but is substantively Christian. Its biblical sources (Exodus, Magnificat, Luke 4), patristic precedents (Basil, Chrysostom), and theological commitments (incarnation, eschatology) are all Christian. Marx provides tool, not substance.",
    paragraphs:[
      { topic:"Marxist elements", scholars:["Gutiérrez","Boff"], argument:"Class analysis; structural sin; preferential option for the poor as analytical category. These have Marxist resonances.", counter:"Resonance isn't identity.", response:"Right — they are Christian deployments of Marxist analytical tools." },
      { topic:"Christian substance", scholars:["Gutiérrez (A Theology of Liberation)","Pope Francis"], argument:"Biblical foundation (Exodus liberation, Magnificat, Jesus' identification with poor), patristic precedent, theological grounding in incarnation. Pope Francis' rehabilitation confirms.", counter:"Selective use of scripture.", response:"All theology is selective use; Gutiérrez's selection is theologically defensible." },
      { topic:"Theological achievements", scholars:["Romero (martyred 1980, canonised 2018)","Sobrino"], argument:"Liberation theology produced Christian witness (Romero) and Christian theology (Sobrino's Christology). These are theological, not political, achievements.", counter:"They're both political and theological.", response:"Yes — but to call them 'Marxist not Christian' is to miss the theological depth." }
    ],
    conclusion:"Gutiérrez's liberation theology uses Marxist tools for Christian ends. The substance is biblical, patristic, theological. Marx provided analysis; Christianity provided substance. Calling it 'Marxist not Christian' confuses tool with substance." }
];
