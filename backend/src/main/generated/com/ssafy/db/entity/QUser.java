package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 846542477L;

    public static final QUser user = new QUser("user");

    public final DateTimePath<java.time.LocalDateTime> MOD_DTM = createDateTime("MOD_DTM", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> REG_DTM = createDateTime("REG_DTM", java.time.LocalDateTime.class);

    public final StringPath userEmail = createString("userEmail");

    public final StringPath userId = createString("userId");

    public final StringPath userName = createString("userName");

    public final StringPath userPassword = createString("userPassword");

    public final StringPath userRRN = createString("userRRN");

    public final NumberPath<Long> userSeq = createNumber("userSeq", Long.class);

    public final StringPath userTel = createString("userTel");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

