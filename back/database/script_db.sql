CREATE TABLE DL_EMOTION(
        id_emotion   INTEGER  NOT NULL PRIMARY KEY,
        emotion_name Varchar (50) NOT NULL
);

CREATE TABLE DL_EMOTION_RANK(
        id_answer INTEGER NOT NULL,
        id_emotion  INTEGER NOT NULL ,
        emotion_rank INTEGER,
        FOREIGN KEY (id_emotion) REFERENCES DL_EMOTION(id_emotion),
        PRIMARY KEY (id_answer,id_emotion,emotion_rank)
);

CREATE TABLE DL_IMAGE(
        id_image INTEGER NOT NULL,
        id_emotion INTEGER NOT NULL ,
        PRIMARY KEY (id_image,id_emotion)
);

CREATE TABLE DL_ANSWER(
        id_answer          INTEGER NOT NULL,
        feeling TEXT NOT NULL,
        timestamp_ans TIMESTAMP,
        ip_user Varchar (50) NOT NULL,
        id_user Varchar(50) NOT NULL,
        id_image INTEGER,
    PRIMARY KEY (id_answer)
);

INSERT INTO "DL_EMOTION" ("id_emotion","emotion_name") VALUES 
(1,"worried"),
(2,"scared"),
(3, "irritated"),
(4, "furious"),
(5, "surprise" ),
(6, "happy"),
(7, "sad"),
(8, "other");

INSERT INTO "DL_IMAGE" ("id_image","id_emotion") VALUES (4422466255260653, 4), (46513708907952440, 4), (45386234605318260, 4), (46181915300592330, 4), (46122992596594430, 4), (47511188769842380, 4), (46021374025181360, 4), (48664568071416670, 4), (47238999577015790, 4), (46987701807058530, 4), (43500631924103350, 4), (48478934834505840, 4), (43694005111277790, 4), (46279329538440960, 4), (45469380209055384, 4), (41831600501282350, 4), (46196683993595850, 4), (43231764021428720, 4), (46455591614361130, 4), (44512354238367830, 4), (48865181190239816, 4), (45514851953959880, 4), (47383224863997520, 4), (48554301613620390, 4), (45304005242847650, 4), (45351632911581790, 4), (41242715108456570, 4), (46754210743120120, 4), (45589986170356420, 4), (43262126802365730, 4), (47708309602791330, 4), (47056223722902380, 4), (44660371964823540, 4), (41787220006078504, 4), (44067471993735540, 4), (47174932515353240, 4), (46066676995918160, 4), (41122741352454150, 4), (46362256824078990, 4), (44494788332013480, 4), (48195783610191110, 4), (42929553422911050, 4), (46936171834089220, 4), (48825219174630530, 4), (43974672738448824, 4), (42764515508825400, 4), (48645564517397640, 4), (41437534447713460, 4), (43188422659103370, 4), (48999486705518020, 4), (43636056324227990, 4), (44604405074500940, 4), (45928426734342210, 4), (47280414449172760, 4), (41496060405143940, 4), (46741485952637970, 4), (43413714322673460, 4), (41436458082919840, 4), (4200457871130991, 4), (48351176167795790, 4), (4969114485512058, 4), (48924480383101510, 4), (44239372223024640, 4), (48616395776079110, 4), (42643778897975784, 4), (47555287694191256, 4), (46519632086746184, 4), (44964597825781270, 4), (46858673588928424, 4), (4386964610039855, 4), (47239223885748000, 4), (4985317134281259, 4), (42866979571914536, 4), (43620901618180360, 4), (44215642897607600, 4), (41897164539420960, 4), (45634908865132430, 4), (43180528395030060, 4), (46702865106254184, 4), (44896450092962984, 4), (41844327981945300, 4), (48882537534767830, 4), (43354496883831176, 4), (47938228483651950, 4), (47993608232658296, 4), (48515958254852170, 4), (42739536716708790, 4), (43528092560876490, 4), (4983204520379750, 4), (45895049387479600, 4), (4902760075139240, 4), (41182060779360150, 4), (45989645491415176, 4), (42611574887467300, 4), (43677776123828370, 4), (47176816757643150, 4), (4714437365491790, 4), (43487648723095064, 4), (46735598623473880, 4), (43081578211983260, 4), (42455169995302950, 4), (4136744777478406, 4), (4367371366258710, 4), (42682956527733890, 4), (43707300632591100, 4), (41900531032912300, 4), (45316834317169250, 4), (48521322984678504, 4), (44008577339704230, 4), (42335435223626750, 4), (45683195124131950, 4), (47453318963044130, 4), (47782436920573420, 4), (47909173211093090, 4), (45032477183356130, 4), (46164640185451640, 4), (46393786316829090, 4), (4914407769422177, 4), (42432318259672400, 4), (45237255073528650, 4), (4579432537098708, 4), (45211432512555690, 4), (41498064760680690, 4), (46122379082950860, 4), (47825536773458880, 4), (42421183300762450, 4), (35790622308371990, 3), (32054924704738020, 3), (35371837858920296, 3), (3628402609109619, 3), (34176251041390030, 3), (36484498188111920, 3), (33230672037961776, 3), (33521952539984244, 3), (3501727461431389, 3), (3812409641640525, 3), (31242252041443356, 3), (37059838077114010, 3), (37334332328415460, 3), (31960463335727860, 3), (37295281547484510, 3), (32665901765794520, 3), (34037553375079690, 3), (37888903259816590, 3), (31632054528262570, 3), (38551831253799120, 3), (33443564893167436, 3), (34778202931907390, 3), (33983297918034684, 3), (31084074442597156, 3), (38120102931387370, 3), (36894248856604930, 3), (38724155172269070, 3), (38712545088286720, 3), (32135501055956584, 3), (32789024325966190, 3), (37204948053672390, 3), (34842904553251016, 3), (3893933365424720, 3), (322782008244508, 3), (3646188932256128, 3), (35715955662627444, 3), (32572148810594228, 3), (35783830126821184, 3), (37863114082751090, 3), (32473653298717364, 3), (36633942815188760, 3), (36537812821739624, 3), (38864241999992140, 3), (31264907662535268, 3), (31101894058867584, 3), (34695265867334636, 3), (33827182099852320, 3), (38945323680347064, 3), (38298156180201380, 3), (32514132257078624, 3), (3510481082557836, 3), (36167180313727944, 3), (34413399346833724, 3), (32764515508825400, 3), (32348605348286700, 3), (34485953610627172, 3), (3619176416135826, 3), (35123961417195548, 3), (37626998006542750, 3), (32380501939552924, 3), (34725999869956190, 3), (32083301270001590, 3), (36028492633299092, 3), (33584028041973776, 3), (38432873573145220, 3), (34222511255292148, 3), (3648840096992991, 3), (34174946966685932, 3), (32398175591469304, 3), (38400821844588930, 3), (3335834789867881, 3), (3540243460245389, 3), (36400473025488184, 3), (36029050311609710, 3), (32176494825478644, 3), (34779045698498790, 3), (3772229394700769, 3), (38129088408873144, 3), (34820703667232196, 3), (3760766895082849, 3), (31579212921056548, 3), (31639585721912690, 3), (33296982663637210, 3), (31461414590658504, 3), (3745961208295142, 3), (38636686083012490, 3), (36418696371539380, 3), (31263581845501364, 3), (31276650672487890, 3), (33926659722722576, 3), (35124780073085690, 3), (31429282429398830, 3), (36182900427125470, 3), (38257038495664150, 3), (33756189356970030, 3), (32801369419430430, 3), (38984273187587736, 3), (37834299810213180, 3), (35130014044898536, 3), (32810310005236116, 3), (31712928353750464, 3), (34158980522406610, 3), (31557094546972948, 3), (31611993848505692, 3), (33012290373763068, 3), (36228812697287340, 3), (31434592800504496, 3), (34599458844979624, 3), (38129602873652650, 3), (3103967068542510, 3), (35857776942472160, 3), (3673251308900020, 3), (38747456826327730, 3), (34754693516793896, 3), (34787260827769500, 3), (38103262754377920, 3), (33936073351131250, 3), (31064326003272104, 3), (34050786626777450, 3), (33390397261132024, 3), (37756835025364690, 3), (33321800023759644, 3), (34122368148977650, 3), (34779499042189650, 3), (31610181288121300, 3), (37829424135505950, 3), (32611257497437452, 3), (32085939805490350, 3), (32968924576669810, 3), (36894714510433840, 3), (36733523765316060, 3), (35265929440880440, 3), (32346733898332216, 3), (36537834358858240, 3), (31516320618018412, 3), (35189207080815170, 3), (38923526292026590, 3), (31932288640015990, 3), (33450765608685610, 3), (31318459979119210, 3), (32397594728132110, 3), (32397298468398790, 3), (31565963564609788, 3), (36331864196343710, 3), (37219497312013176, 3), (33184704045441110, 3), (34251674195298840, 3), (34962524317546916, 3), (37533374396865980, 3), (31315576710463988, 3), (34761229344389628, 3), (23671888625987550, 2), (23325819796614104, 2), (25590831335616530, 2), (27168951619617820, 2), (2993525408244453, 2), (22237903535427630, 2), (27294545535155750, 2), (22133895069098850, 2), (28663093148740480, 2), (23678088161699510, 2), (23426511600620440, 2), (27748080283756116, 2), (26083540544836124, 2), (23861110303559536, 2), (21895711670869708, 2), (26335261661618384, 2), (12015594379807824, 1), (13419782547179012, 1), (11693395622557360, 1), (11979227201182278, 1), (15399098731435140, 1), (11751658948869972, 1), (17506081542204218, 1), (11160164915160504, 1), (16615950856582542, 1), (15642028436884744, 1), (18645404736151324, 1), (1998476090556175, 1), (18659280182155850, 1), (15915447578587186, 1), (18599888198472850, 1), (14726313003525658, 1), (12563134319149620, 1), (18679540219675708, 1), (1216022998788913, 1), (1676119032980107, 1), (18806357500917040, 1), (15665113024687692, 1), (16629974486641304, 1), (18736861316279304, 1), (12151174878952720, 1), (11685768961578384, 1), (14398629843515488, 1), (1824332787698193, 1), (12853784949432992, 1), (14757889711651436, 1), (12898793339617560, 1), (16966881359440828, 1), (16318818435359448, 1), (14859607814131360, 1), (12729050827605554, 1), (13806903691100084, 1), (17675688185307392, 1), (17961601015209296, 1), (14896677672331932, 1), (17038703582352800, 1), (18155748968102440, 1), (12348416572331348, 1), (16630368770508936, 1), (16416522806271568, 1), (17234917174059032, 1), (1138121681295057, 1), (1383740929685036, 1), (15927231509974608, 1), (12388542927513128, 1), (14088657319490616, 1), (12641136131833244, 1), (13877114814073528, 1), (13098567923505310, 1), (14312510720006870, 1), (18675393367347230, 1), (13714783241169992, 1), (18867170535027630, 1), (12288328098538920, 1), (12232753529938570, 1), (13547468749506028, 1), (11753221183017384, 1), (18201141917437590, 1), (11992323384048256, 1), (14516591958077332, 1), (14736565104598606, 1), (12574761041439488, 1), (14838314679758436, 1), (12982335913550004, 1), (12913959958745888, 1), (1263916008872920, 1), (16981910958434122, 1), (14208180234733044, 1), (18031822594733830, 1), (15493371461707644, 1), (13441238193069188, 1), (16420768767446372, 1), (13626681548933124, 1), (11383252198825448, 1), (16212095928628836, 1), (16663964795863556, 1), (12433722058058752, 1), (17733652963523356, 1), (18627898846275092, 1), (15076907192061924, 1), (12427262605805248, 1), (18289090231474840, 1), (15144873782417416, 1), (11431427085072514, 1), (11496060405143934, 1), (11710751157405808, 1), (11297773265473432, 1), (18420327692200904, 1), (12091814321363436, 1), (15276086292996904, 1), (11270573459675112, 1), (14850004965180524, 1), (17570568706862720, 1), (1164811665947588, 1), (18019379108657850, 1), (14105564644948588, 1), (11691463951305152, 1), (16567250967633892, 1), (13510680082758432, 1), (18868598626420280, 1), (1881210362721335, 1), (182399062422576, 1), (1918220629371169, 1), (17442978041706036, 1), (14926385736731732, 1), (15701837435624130, 1), (11471065880476684, 1), (17514148079377250, 1);