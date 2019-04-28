USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_PENDING_MOVIE_LIST_OF_USER`;

DELIMITER $$
USE `movie_lib`$$
CREATE DEFINER=`pravintirthani`@`%` PROCEDURE `SP_GET_PENDING_MOVIE_LIST_OF_USER`(IN param_login_token VARCHAR(100),IN param_genre VARCHAR(100))
BEGIN
SELECT 
	m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language,
	group_concat(g.name) as genre
FROM 
	movie m 
inner join 
	movie_genre_assoc mga
on mga.movie_id=m.id	
 inner join 
	genres g
on g.id=mga.genre_id    
left join 	
	user_fav_movie_assoc ufma 
on ufma.movie_id=m.id  
left join 
	user u 
on u.id=ufma.user_id    
AND u.login_token=param_login_token    
where ufma.id is NULL
-- and genre IN (param_genre)
group by 
    m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language;   
END$$

DELIMITER ;

USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_USER_MOVIE_LIST`;

DELIMITER $$
USE `movie_lib`$$
CREATE DEFINER=`pravintirthani`@`%` PROCEDURE `SP_GET_USER_MOVIE_LIST`(IN param_login_token VARCHAR(100))
BEGIN
SELECT 
    m.id,
    m.name,
    m.ratings,
    m.overview,
    YEAR(m.publish_date),
    m.publish_date,
    m.published_language,
    GROUP_CONCAT(g.name) as genre,
    u.login_token
FROM
    movie m
        INNER JOIN
    movie_genre_assoc mga ON mga.movie_id = m.id
        INNER JOIN
    genres g ON g.id = mga.genre_id
        INNER JOIN
    user_fav_movie_assoc ufma ON ufma.movie_id = m.id
        INNER JOIN
    user u ON u.id = ufma.user_id    
WHERE
    u.login_token = param_login_token
GROUP BY m.id , m.name , m.ratings , m.overview , YEAR(m.publish_date) , m.publish_date , m.published_language;

END$$

DELIMITER ;


USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_MOVIE_LIST`;

DELIMITER $$
USE `movie_lib`$$
CREATE PROCEDURE `SP_GET_MOVIE_LIST` ()
BEGIN
SELECT 
	m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language,
	group_concat(g.name) as genre
FROM 
	movie m 
inner join 
	movie_genre_assoc mga
on mga.movie_id=m.id	
 inner join 
	genres g
on g.id=mga.genre_id      
where 
	genre IN (param_genre)
group by 
    m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language;   
END$$

DELIMITER ;

USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_MOVIE_LIST`;

DELIMITER $$
USE `movie_lib`$$
CREATE DEFINER=`pravintirthani`@`%` PROCEDURE `SP_GET_MOVIE_LIST`(IN param_genres varchar(100))
BEGIN
SELECT 
	m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date) as year,
    m.publish_date, 
    m.published_language,
	group_concat(g.name) as genre
FROM 
	movie m 
inner join 
	movie_genre_assoc mga
on mga.movie_id=m.id	
 inner join 
	genres g
on g.id=mga.genre_id      
where 1=1
-- genre IN (param_genre)
group by 
    m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language;   
END$$

DELIMITER ;


USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_MOVIE_LIST`;

DELIMITER $$
USE `movie_lib`$$
CREATE DEFINER=`pravintirthani`@`%` PROCEDURE `SP_GET_MOVIE_LIST`(IN param_genres varchar(100))
BEGIN
SELECT 
	m.id,  
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date) as year,
    m.publish_date, 
    m.published_language,
	group_concat(g.name) as genre,
    group_concat(mca.cast_name,"-",mca.cast_role) as  cast
FROM 
	movie m 
inner join 
	movie_genre_assoc mga
on mga.movie_id=m.id	
 inner join 
	genres g
on g.id=mga.genre_id      
 inner join
 movie_cast_assoc mca
 on	mca.movie_id=m.id
where 1=1
-- genre IN (param_genre)
group by 
    m.id, 
    m.name, 

    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language;   
END$$

USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_MOVIE_LIST`;

DELIMITER $$
USE `movie_lib`$$
CREATE DEFINER=`pravintirthani`@`%` PROCEDURE `SP_GET_MOVIE_LIST`(IN param_genres varchar(100))
BEGIN
SELECT 
	m.id,  
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date) as year,
    m.publish_date, 
    m.published_language,
	group_concat(distinct g.name) as genre,
    group_concat(distinct  mca.cast_name,"-",mca.cast_role ORDER BY  mca.cast_role) as  cast
FROM 
	movie m 
inner join 
	movie_genre_assoc mga
on mga.movie_id=m.id	
 inner join 
	genres g
on g.id=mga.genre_id      
 inner join
 movie_cast_assoc mca
 on	mca.movie_id=m.id
where CASE WHEN param_genres IS NULL THEN 1 ELSE g.id=param_genres END=1
group by 
    m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language;   
END$$

DELIMITER ;




USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_MOVIE_LIST`;

DELIMITER $$
USE `movie_lib`$$
CREATE DEFINER=`pravintirthani`@`%` PROCEDURE `SP_GET_MOVIE_LIST`(IN param_genres varchar(100))
BEGIN
SELECT 
	m.id,  
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date) as year,
    m.publish_date, 
    m.published_language,
	group_concat(distinct g.name) as genre,
    group_concat(distinct  mca.cast_name,"-",mca.cast_role ORDER BY  mca.cast_role) as  cast
FROM 
	movie m 
inner join 
	movie_genre_assoc mga
on mga.movie_id=m.id	
 inner join 
	genres g
on g.id=mga.genre_id      
 inner join
 movie_cast_assoc mca
 on	mca.movie_id=m.id
where CASE WHEN param_genres IS NULL OR param_genres='' THEN 1 ELSE g.id=param_genres END=1
group by 
    m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language;   
END$$

DELIMITER ;


USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_USER_MOVIE_LIST`;

DELIMITER $$
USE `movie_lib`$$
CREATE DEFINER=`pravintirthani`@`%` PROCEDURE `SP_GET_USER_MOVIE_LIST`(IN param_login_token VARCHAR(100))
BEGIN
SELECT 
    m.id,
    m.name,
    m.ratings,
    m.overview,
    YEAR(m.publish_date),
    m.publish_date,
    m.published_language,
    GROUP_CONCAT(g.name) as genre,
    group_concat(distinct g.name) as genre,
    group_concat(distinct  mca.cast_name,"-",mca.cast_role ORDER BY  mca.cast_role) as  cast,
    u.login_token
FROM
    movie m
        INNER JOIN
    movie_genre_assoc mga ON mga.movie_id = m.id
        INNER JOIN
    genres g ON g.id = mga.genre_id
        INNER JOIN
    user_fav_movie_assoc ufma ON ufma.movie_id = m.id
        INNER JOIN
    user u ON u.id = ufma.user_id  
		inner join
	movie_cast_assoc mca
 on	mca.movie_id=m.id
WHERE
    u.login_token = param_login_token
GROUP BY m.id , m.name , m.ratings , m.overview , YEAR(m.publish_date) , m.publish_date , m.published_language;
END$$

DELIMITER ;

USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_PENDING_MOVIE_LIST_OF_USER`;

DELIMITER $$
USE `movie_lib`$$
CREATE DEFINER=`pravintirthani`@`%` PROCEDURE `SP_GET_PENDING_MOVIE_LIST_OF_USER`(IN param_login_token VARCHAR(100),IN param_genre VARCHAR(100))
BEGIN
SELECT 
	m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language,
	group_concat(g.name) as genre,
    group_concat(distinct  mca.cast_name,"-",mca.cast_role ORDER BY  mca.cast_role) as  cast
FROM 
	movie m 
inner join 
	movie_genre_assoc mga
on mga.movie_id=m.id	
 inner join 
	genres g
on g.id=mga.genre_id    
left join 	
	user_fav_movie_assoc ufma 
on ufma.movie_id=m.id  
left join 
	user u 
on u.id=ufma.user_id    
AND u.login_token=param_login_token  
 inner join
 movie_cast_assoc mca
 on	mca.movie_id=m.id
where CASE WHEN param_genre IS NULL OR param_genre='' THEN 1 ELSE g.id=param_genre END=1 
AND ufma.id is NULL
group by 
    m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language;   
END$$

DELIMITER ;


USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_USER_MOVIE_LIST`;

DELIMITER $$
USE `movie_lib`$$
CREATE DEFINER=`pravintirthani`@`%` PROCEDURE `SP_GET_USER_MOVIE_LIST`(IN param_login_token VARCHAR(100))
BEGIN
SELECT 
    m.id,
    m.name,
    m.ratings,
    m.overview,
    YEAR(m.publish_date) as year,
    m.publish_date,
    m.published_language,    
    group_concat(distinct g.name) as genre,
    group_concat(distinct  mca.cast_name,"-",mca.cast_role ORDER BY  mca.cast_role) as  cast,
    u.login_token
FROM
    movie m
        INNER JOIN
    movie_genre_assoc mga ON mga.movie_id = m.id
        INNER JOIN
    genres g ON g.id = mga.genre_id
        INNER JOIN
    user_fav_movie_assoc ufma ON ufma.movie_id = m.id
        INNER JOIN
    user u ON u.id = ufma.user_id  
		inner join
	movie_cast_assoc mca
 on	mca.movie_id=m.id
WHERE
    u.login_token = param_login_token
GROUP BY m.id , m.name , m.ratings , m.overview , YEAR(m.publish_date) , m.publish_date , m.published_language;
END$$

DELIMITER ;

USE `movie_lib`;
DROP procedure IF EXISTS `SP_GET_PENDING_MOVIE_LIST_OF_USER`;

DELIMITER $$
USE `movie_lib`$$
CREATE DEFINER=`pravintirthani`@`%` PROCEDURE `SP_GET_PENDING_MOVIE_LIST_OF_USER`(IN param_login_token VARCHAR(100),IN param_genre VARCHAR(100))
BEGIN
SELECT 
	m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date) as year,
    m.publish_date, 
    m.published_language,
	group_concat(distinct g.name) as genre,
    group_concat(distinct  mca.cast_name,"-",mca.cast_role ORDER BY  mca.cast_role) as  cast
FROM 
	movie m 
inner join 
	movie_genre_assoc mga
on mga.movie_id=m.id	
 inner join 
	genres g
on g.id=mga.genre_id    
left join 	
	user_fav_movie_assoc ufma 
on ufma.movie_id=m.id  
left join 
	user u 
on u.id=ufma.user_id    
AND u.login_token=param_login_token  
 inner join
 movie_cast_assoc mca
 on	mca.movie_id=m.id
where CASE WHEN param_genre IS NULL OR param_genre='' THEN 1 ELSE g.id=param_genre END=1 
AND ufma.id is NULL
group by 
    m.id, 
    m.name, 
    m.ratings, 
    m.overview, 
    YEAR(m.publish_date),
    m.publish_date, 
    m.published_language;   
END$$

DELIMITER ;

