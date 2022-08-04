import {nameof} from "./utils";

export class User {
  public id: string;
  public email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }
}

type MapAny = {
  [field: string]: any;
}

export type MapType = {
  [id: string]: number;
}

export enum TraitCriteria {
  openness,
  conscientiousness,
  extraversion,
  agreeableness,
  neuroticism,
}

export enum GenderCriteria {
  notSpecified,
  male,
  female,
  other,
}

export enum AgeRangeCriteria {
  notSpecified,
  silentGeneration,
  babyBoomer,
  generationX,
  generationY,
  generationZ,
  generationAlpha,
}

export enum EthnicityCriteria {
  notSpecified,
  asian,
  black,
  hispanicLatino,
  middleEastern,
  white,
  other,
}

export enum ReportReason {
  subject,
  fake,
  disrespectful,
  inappropriate,
}

/**
 * SystemPictures model.
 */
export class SystemPictures {
  /**
   * Default constructor.
   * @param {string} count
   */
  constructor(
      count: number,
  ) {
    this.count = count;
  }

  /**
   * From map constructor.
   * @param {MapAny} data Model values.
   * @return {SystemPictures} New model instance.
   */
  static fromMap(
      data: MapAny,
  ): SystemPictures {
    return new SystemPictures(
        data[nameof<SystemPictures>("count")] as number,
    );
  }

  /**
   * Convert model to map.
   * @return {object} Map excluding ID.
   */
  toMap(): object {
    return {
      [nameof<SystemPictures>("count")]: this.count,
    };
  }

  count: number;
}

/**
 * Profile model.
 */
export class Profile {
  /**
   * Default constructor.
   * @param {string} profileId
   * @param {string} userId
   * @param {string} name
   * @param {number} yearOfBirth
   * @param {GenderCriteria} gender
   * @param {EthnicityCriteria} ethnicity
   */
  constructor(
      profileId: string,
      userId: string,
      name: string,
      yearOfBirth: number,
      gender: GenderCriteria,
      ethnicity: EthnicityCriteria,
  ) {
    this.profileId = profileId;
    this.userId = userId;
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.gender = gender;
    this.ethnicity = ethnicity;
  }

  /**
   * From map constructor.
   * @param {string} id Model ID.
   * @param {MapAny} data Model values.
   * @return {Profile} New model instance.
   */
  static fromMap(
      id: string,
      data: MapAny,
  ): Profile {
    return new Profile(
        id,
        data[nameof<Profile>("userId")] as string,
        data[nameof<Profile>("name")] as string,
        data[nameof<Profile>("yearOfBirth")] as number,
        data[nameof<Profile>("gender")] as GenderCriteria,
        data[nameof<Profile>("ethnicity")] as EthnicityCriteria,
    );
  }

  /**
   * Convert model to map.
   * @return {object} Map excluding ID.
   */
  toMap(): object {
    return {
      [nameof<Profile>("userId")]: this.userId,
      [nameof<Profile>("yearOfBirth")]: this.yearOfBirth,
      [nameof<Profile>("gender")]: this.gender,
      [nameof<Profile>("ethnicity")]: this.ethnicity,
    };
  }

  profileId: string;
  userId: string;
  name: string;
  yearOfBirth: number;
  gender: GenderCriteria;
  ethnicity: EthnicityCriteria;

  /**
   * Calculate the age range equivalent of the year of birth.
   * @return {number} Age range.
   */
  getAgeRange(): number {
    return this.yearOfBirth < 2000 ? 1 : 0;
  }
}

/**
 * Picture model.
 */
export class Picture {
  /**
   * Default constructor.
   * @param {string} pictureId
   * @param {string} userId
   * @param {string} profileId
   * @param {number} index
   * @param {string} url
   * @param {string} thumbnailUrl
   * @param {Date} createdAt
   */
  constructor(
      pictureId: string,
      userId: string,
      profileId: string,
      index: number,
      url: string,
      thumbnailUrl: string,
      createdAt: Date,
  ) {
    this.pictureId = pictureId;
    this.userId = userId;
    this.profileId = profileId;
    this.index = index;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
    this.createdAt = createdAt;
  }

  /**
   * From map constructor.
   * @param {string} id Model ID.
   * @param {MapAny} data Model values.
   * @return {Picture} New model instance.
   */
  static fromMap(
      id: string,
      data: MapAny,
  ): Picture {
    return new Picture(
        id,
        data[nameof<Picture>("userId")] as string,
        data[nameof<Picture>("profileId")] as string,
        data[nameof<Picture>("index")] as number,
        data[nameof<Picture>("url")] as string,
        data[nameof<Picture>("thumbnailUrl")] as string,
        data[nameof<Picture>("createdAt")] as Date,
    );
  }

  /**
   * Convert model to map.
   * @return {object} Map excluding ID.
   */
  toMap(): object {
    return {
      [nameof<Picture>("userId")]: this.userId,
      [nameof<Picture>("profileId")]: this.profileId,
      [nameof<Picture>("index")]: this.index,
      [nameof<Picture>("url")]: this.url,
      [nameof<Picture>("thumbnailUrl")]: this.thumbnailUrl,
      [nameof<Picture>("createdAt")]: this.createdAt,
    };
  }

  pictureId: string;
  userId: string;
  profileId: string;
  index: number;
  url: string;
  thumbnailUrl: string;
  createdAt: Date;
}

/**
 * Observation model.
 */
export class Observation {
  /**
   * Default constructor.
   * @param {string} observationId
   * @param {string} userId
   * @param {string} profileId
   * @param {string} targetUserId
   * @param {string} targetProfileId
   * @param {string} targetPictureId
   * @param {TraitCriteria} trait
   * @param {boolean} value
   */
  constructor(
      observationId: string,
      userId: string,
      profileId: string,
      targetUserId: string,
      targetProfileId: string,
      targetPictureId: string,
      trait: TraitCriteria,
      value: boolean,
  ) {
    this.observationId = observationId;
    this.userId = userId;
    this.profileId = profileId;
    this.targetUserId = targetUserId;
    this.targetProfileId = targetProfileId;
    this.targetPictureId = targetPictureId;
    this.trait = trait;
    this.value = value;
  }

  /**
   * From map constructor.
   * @param {string} id Model ID.
   * @param {MapAny} data Model values.
   * @return {CriteriaScore} New model instance.
   */
  static fromMap(
      id: string,
      data: MapAny,
  ): Observation {
    return new Observation(
        id,
        data[nameof<Observation>("userId")] as string,
        data[nameof<Observation>("profileId")] as string,
        data[nameof<Observation>("targetUserId")] as string,
        data[nameof<Observation>("targetProfileId")] as string,
        data[nameof<Observation>("targetPictureId")] as string,
        data[nameof<Observation>("trait")] as TraitCriteria,
        data[nameof<Observation>("value")] as boolean,
    );
  }

  /**
   * Convert model to map.
   * @return {object} Map excluding ID.
   */
  toMap(): object {
    return {
      [nameof<Observation>("userId")]: this.userId,
      [nameof<Observation>("profileId")]: this.profileId,
      [nameof<Observation>("targetUserId")]: this.targetUserId,
      [nameof<Observation>("targetProfileId")]: this.targetProfileId,
      [nameof<Observation>("targetPictureId")]: this.targetPictureId,
      [nameof<Observation>("trait")]: this.trait,
      [nameof<Observation>("value")]: this.value,
    };
  }

  observationId: string;
  userId: string;
  profileId: string;
  targetUserId: string;
  targetProfileId: string;
  targetPictureId: string;
  trait: TraitCriteria;
  value: boolean;

  /**
   * Calculate the score equivalent of the value.
   * @return {number} Score.
   */
  getScore(): number {
    return this.value ? 1.0 : -1.0;
  }
}

/**
 * CriteriaScore model.
 */
export class CriteriaScore {
  /**
   * Default constructor.
   * @param {string} criteriaScoreId
   * @param {string} userId
   * @param {string} profileId
   * @param {string | null} pictureId
   * @param {MapType} counts
   * @param {MapType} scores
   * @param {Date} updatedAt
   */
  constructor(
      criteriaScoreId: string,
      userId: string,
      profileId: string,
      pictureId: string | null,
      counts: MapType,
      scores: MapType,
      updatedAt: Date,
  ) {
    this.criteriaScoreId = criteriaScoreId;
    this.userId = userId;
    this.profileId = profileId;
    this.pictureId = pictureId;
    this.counts = counts;
    this.scores = scores;
    this.updatedAt = updatedAt;
  }

  /**
   * From map constructor.
   * @param {string} id Model ID.
   * @param {MapAny} data Model values.
   * @return {CriteriaScore} New model instance.
   */
  static fromMap(
      id: string,
      data: MapAny,
  ) : CriteriaScore {
    return new CriteriaScore(
        id,
        data[nameof<CriteriaScore>("userId")] as string,
        data[nameof<CriteriaScore>("profileId")] as string,
        data[nameof<CriteriaScore>("pictureId")] as string,
        data[nameof<CriteriaScore>("counts")] as MapType,
        data[nameof<CriteriaScore>("scores")] as MapType,
        data[nameof<CriteriaScore>("updatedAt")] as Date,
    );
  }

  /**
   * Convert model to map.
   * @return {object} Map excluding ID.
   */
  toMap(): object {
    return {
      [nameof<CriteriaScore>("userId")]: this.userId,
      [nameof<CriteriaScore>("profileId")]: this.profileId,
      [nameof<CriteriaScore>("pictureId")]: this.pictureId,
      [nameof<CriteriaScore>("counts")]: this.counts,
      [nameof<CriteriaScore>("scores")]: this.scores,
      [nameof<CriteriaScore>("updatedAt")]: this.updatedAt,
    };
  }

  criteriaScoreId: string;
  userId: string;
  profileId: string;
  pictureId: string | null;
  counts: MapType;
  scores: MapType;
  updatedAt: Date;
}

/**
 * Report model.
 */
export class Report {
  /**
   * Default constructor.
   * @param {string} reportId
   * @param {string} userId
   * @param {string} profileId
   * @param {string} targetUserId
   * @param {string} targetProfileId
   * @param {string} targetPictureId
   * @param {ReportReason[]} reportReasons
   * @param {Date} createdAt
   */
  constructor(
      reportId: string,
      userId: string,
      profileId: string,
      targetUserId: string,
      targetProfileId: string,
      targetPictureId: string,
      reportReasons: ReportReason[],
      createdAt: Date,
  ) {
    this.reportId = reportId;
    this.userId = userId;
    this.profileId = profileId;
    this.targetUserId = targetUserId;
    this.targetProfileId = targetProfileId;
    this.targetPictureId = targetPictureId;
    this.reportReasons = reportReasons;
    this.createdAt = createdAt;
  }

  /**
   * From map constructor.
   * @param {string} id Model ID.
   * @param {MapAny} data Model values.
   * @return {Report} New model instance.
   */
  static fromMap(
      id: string,
      data: MapAny,
  ) : Report {
    return new Report(
        id,
        data[nameof<Report>("userId")] as string,
        data[nameof<Report>("profileId")] as string,
        data[nameof<Report>("targetUserId")] as string,
        data[nameof<Report>("targetProfileId")] as string,
        data[nameof<Report>("targetPictureId")] as string,
        data[nameof<Report>("reportReasons")] as ReportReason[],
        data[nameof<Report>("createdAt")] as Date,
    );
  }

  /**
   * Convert model to map.
   * @return {object} Map excluding ID.
   */
  toMap(): object {
    return {
      [nameof<Report>("userId")]: this.userId,
      [nameof<Report>("profileId")]: this.profileId,
      [nameof<Report>("targetUserId")]: this.targetUserId,
      [nameof<Report>("targetProfileId")]: this.targetProfileId,
      [nameof<Report>("targetPictureId")]: this.targetPictureId,
      [nameof<Report>("reportReasons")]: this.reportReasons,
      [nameof<Report>("createdAt")]: this.createdAt,
    };
  }

  reportId: string;
  userId: string;
  profileId: string;
  targetUserId: string;
  targetProfileId: string;
  targetPictureId: string;
  reportReasons: ReportReason[];
  createdAt: Date;
}
